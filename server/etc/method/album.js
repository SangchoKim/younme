const User = require('../../model/user');
const Album = require('../../model/album');
const fs = require('fs');
const path = require('path');

const _albumRead = (req,res) =>{
    const order = req.user._id;
    const shared_code = req.user._code.codes;
    const img = req.query.image;
    const mode = req.query.order;
    if(order){
      switch(mode){
        case "DELETE": return _deleteAlbum(shared_code,img,order,res);
        case "MODIFY": return _modifyAlbum(shared_code,img,order,res);
        default: _readAlbum(order,res); 
      }    
    }else{
    console.log('세션 _id 값 없음');
      res.json({result:0});
    }
  }

  const _modifyAlbum = (shared_code,img,order,res) => {
    console.log('공유앨범 Modify 준비',shared_code,img);
    const query = {'_code':shared_code};
    Album.updateOne(query,{$set:{sharedSchema: {src:img 
                                  }}},(err,result)=>{
                if(err) throw new Error();
                else {
                  if(result.ok===1){
                    _fsModify(img);
                    console.log('공유앨범 수정완료');
                  _readAlbum(order,res); 
              }
            }
          })
  }

  const _deleteAlbum = (shared_code,img,order,res) => {
    console.log('공유앨범Delete 준비',shared_code,img);
              const query = {'_code':shared_code};
              Album.updateOne(query,{$pull:{sharedSchema: {src:img 
                                  }}},(err,result)=>{
                if(err) throw new Error();
                else {
                  if(result.ok===1){
                    _fsRemove(img);
                    console.log('공유앨범Delete완료');
                  _readAlbum(order,res); 
              }
            }
          })
  }

  const _fsModify = (img) => {
    const directory = path.join(process.cwd()+'/public/uploadsAlbum/'); 
    console.log("directory:",directory);
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if(file===img)
        fs.writeFile(path.join(directory, file), err => {
          if (err) throw err;
          else console.log('FS_이미지 수정 성공');
        });
      }
    });
  }

  const _fsRemove = (img) => {
    const directory = path.join(process.cwd()+'/public/uploadsAlbum/'); 
    console.log("directory:",directory);
    
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if(file===img)
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
          else console.log('FS_이미지 삭제 성공');
        });
      }
    });
  }

  const _readAlbum = (order,res) => {
    User.findOne({ _id: order })
    .then((result) =>{
      let _img = null;
      let _code = null;
      _code =  result._code.codes;
      console.log("codes:",_code);
      Album.find({ '_code' : _code })
      .then((result)=>{
        if(result){
          console.log('공유앨범Read 완료',result[0].sharedSchema);
          _img = result[0].sharedSchema;
          res.json({result:1,img:_img});
        }else{
          console.log('공유앨범Read 실패'); 
          res.json({result:5});
        }
      })
      .catch((err) => {
          console.log(err);
        });  
    })
  }

  
module.exports = {
    albumRead: _albumRead
}