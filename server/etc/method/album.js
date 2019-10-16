const User = require('../../model/user');
const Album = require('../../model/album');
const Alert = require('../../model/alert');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const _alertFindOne = async(join_code, req, next) => {
  try {
    const order = req.user._id;
    const oppentEmail = req.user._code.oppentEmail;

    const userData = await User.findOne({'_id':order});
    const oppentData = await User.findOne({'id':oppentEmail}); 
    const alertData = await Alert.findOne({"_code":parseInt(join_code)}); 
  if(alertData){
    console.log('Alert_데이터가 존재합니다.');
    const index = alertData.dataSchema.length - 1;
    const _sendData = await {
                            _code:alertData._code,
                            number:alertData.dataSchema[index].number,
                            crud:alertData.dataSchema[index].crud,
                            name:userData.name,
                            oppentName:oppentData.name,
                            cratedAt:alertData.dataSchema[index].cratedAt,
                            }
                            
    req.app.get('io').of('/alert').to(join_code).emit('Alert_send', _sendData); // 키, 값                     
  }else{
    console.log('찾는 Alert data가 존재하지 않습니다.');
  }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const _albumRead = (req,res,next) =>{
    try {
    const order = req.user._id;
    const shared_code = req.user._code.codes;
    const img = req.query.image;
    const mode = req.query.order;
    if(order){
      switch(mode){
        case "DELETE": return _deleteAlbum(shared_code,img,order,res,next,req);
        default: _readAlbum(order,res,next); 
      }    
    }else{
    console.log('세션 _id 값 없음');
      res.json({result:0});
    }
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }

  // const s = multer.diskStorage({
  //   destination: "./public/uploadsAlbum/",
  //   filename: function(req, file, cb){
  //      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  //   }
  // });

  // const _modiAlbum = multer({
  // storage: s,
  // limits:{fileSize: 10000000000},
  // });

  const _updatealbum = (req,res,next) => {
    try {
    console.log("req.file:", req.file);
    const order = req.user._id;
    const _filename = req.file.location;
    const _originalname = req.file.originalname;
    const _size = req.file.size;
    const shared_code = req.user._code.codes;
    const querys = {'_code':shared_code};
    console.log('공유앨범 Modify 준비',shared_code,_originalname,_filename);

    // Alert 업데이트 
    Alert.updateOne(querys,{$addToSet:{'dataSchema':{number: 2, crud:2}}},(err,result)=>{
      if(err) throw new Error();
      else {
        if(result.ok===1){
          console.log("Alert_sharedAlbum 업데이트 코드 수정 완료");
          _alertFindOne(shared_code,req,next);
        }
      }
    });

    // SharedAlbum data 수정
    const query = {'_code':shared_code, "sharedSchema":{ $elemMatch:{"src":_originalname}}};
    Album.updateOne(query,{$set:{"sharedSchema.$.originalname":_originalname, 
                                  "sharedSchema.$.src":_filename,
                                  "sharedSchema.$.size": _size
                                  }},(err,result)=>{
                if(err) throw new Error();
                else {
                  if(result.ok===1){
                     _readAlbum(order,res,next);  
                    // _fsRemove(_originalname,order,res);
                    console.log('공유앨범 수정완료');
                  
              }
            }
          })
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }

  const _deleteAlbum = (shared_code,img,order,res,next,req) => {
    try {
      console.log('공유앨범Delete 준비',shared_code,img);
              const query = {'_code':shared_code};
              
              // Alert 업데이트 
              Alert.updateOne(query,{$addToSet:{'dataSchema':{number: 2, crud:3}}},(err,result)=>{
                if(err) throw new Error();
                else {
                  if(result.ok===1){
                    console.log("Alert_sharedAlbum 삭제코드 수정 완료");
                    _alertFindOne(shared_code,req,next);
                  }
                }
              });

              // SharedAlbum data 삭제
              Album.updateOne(query,{$pull:{sharedSchema: {src:img 
                                  }}},(err,result)=>{
                if(err) throw new Error();
                else {
                  if(result.ok===1){
                    // _fsRemove(img,order,res, next);
                    _readAlbum(order,res,next);
                    console.log('공유앨범Delete완료');
                 
              }
            }
          })
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }

  // const _fsRemove = async(img,order,res,next) => {

  //   try {
  //     const directory = path.join(process.cwd()+'/public/uploadsAlbum/'); 
  //     console.log("directory:",directory);
  //     await fs.readdir(directory, (err, files) => {
  //       if (err) throw err;
  //       for (const file of files) {
  //         if(file===img)
  //         fs.unlink(path.join(directory, file), err => {
  //           if (err) throw err;
  //           else console.log('FS_이미지 삭제 성공');
  //         });
  //       }
  //     });
  //     await _readAlbum(order,res,next);  
  //   } catch (error) {
  //     console.error(error);
  //     next(error);
  //   }
    
  // }

  const _readAlbum = (order,res,next) => {
    try {
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
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }

  // const storages = multer.diskStorage({
  //   destination: "./public/uploadsAlbum/",
  //   filename: function(req, file, cb){
  //      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  //   }
  // });
  // const _uploadAlbum = multer({
  // storage: storages,
  // limits:{fileSize: 1000000},
  // });
  
  const _setalbum =(req,res,next) => {
    try {
      console.log("req.file:", req.file);
      const file = req.file;
      if(file){
        const shared_code = req.user._code.codes;
        const order = req.user._id;
        const _filename = req.file.location;
        const _originalname = req.file.originalname;
        const _size = req.file.size;
        let _code = null;
        if(order){
          User.findOne({ _id: order })
          .then((result)=>{
            console.log(result);
            _code =  result._code.codes; 
            Album.findOne({ '_code' : _code })
            .then((result)=>{
              console.log("albumSkima유뮤존재",result);
              if(result.sharedSchema!==null){
                // 값이 있으므로 SHAREDALBUM Update
                console.log('sharedSchema 값이 있음',result.sharedSchema);
                const query = {'_code':result._code};
                
                // Alert 업데이트 
                Alert.updateOne(query,{$addToSet:{'dataSchema':{number: 2, crud:1}}},(err,result)=>{
                  if(err) throw new Error();
                  else {
                    if(result.ok===1){
                      console.log("Alert_sharedAlbum 삽입 코드 수정 완료");
                      _alertFindOne(shared_code,req,next);
                    }
                  }
                });

                // SharedAlbum안에 data가 있을때 업데이트 
                Album.updateOne(query,{$addToSet:{'sharedSchema': {'size':_size, 
                                      'originalname':_originalname, 
                                      'src':_filename
                                    }}},{upsert:true,new: true},(err,result)=>{
                  if(err) throw new Error();
                  else {
                    if(result.ok===1){
                  Album.findOne({'_code':_code})
                  .then((result)=>{
                    if(result){
                    let _img = null;
                    console.log('공유앨범Read 완료',result.sharedSchema);
                    _img = result.sharedSchema;
                    res.json({result:1,img:_img});
                    }else{
                      console.log('공유앨범Read 실패'); 
                      res.json({result:5});
                    }
                  })
                }
                }
                })
                .catch((err) => {
                console.log(err);
                });   
          }else{
               // 값이 없으므로 SHAREDALBUM Insert
              console.log('sharedSchema 값이 없음');
              const query = {'_code':result._code};

              // Alert 업데이트 
              Alert.updateOne(query,{$addToSet:{'dataSchema':{number: 2, crud:1}}},(err,result)=>{
                if(err) throw new Error();
                else {
                  if(result.ok===1){
                    console.log("Alert_sharedAlbum 삽입 코드 수정 완료");
                    _alertFindOne(shared_code,req,next);
                  }
                }
              });

               // SharedAlbum안에 data가 없을때 업데이트 
              Album.updateOne(query,{$set:{'sharedSchema': {'size':_size, 
                                      'originalname':_originalname, 
                                      'src':_filename
                                    }}},{upsert:true,new: true},(err,result)=>{
                  if(err) throw new Error();
                  else {
                    if(result.ok===1){
                  Album.findOne({'_code':_code})
                  .then((result)=>{
                    if(result){
                      let _img = null;
                      console.log('공유앨범Read 완료',result.sharedSchema);
                      _img = result.sharedSchema;
                      res.json({result:1,img:_img});
                      }else{
                        console.log('공유앨범Read 실패'); 
                        res.json({result:5});
                      }
                  })
                }
                }
                })
                .catch((err) => {
                console.log(err);
                });   
            }
            })
          })
        }
      }else{
        res.json({result:0});
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }

  
module.exports = {
    albumRead: _albumRead,
    setalbum:_setalbum,
    // uploadAlbum:_uploadAlbum,
    // modiAlbum:_modiAlbum,
    updatealbum:_updatealbum,

}