const datediff = require('../../../src/lib/moment').datediff;
const User = require('../../model/user');
const Album = require('../../model/album');
const Calendar = require('../../model/calendar');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const _checkLogin = (req, res) => {
  const order = req.user._id;
  if(order){
    User.findOne({ _id: order })
    .then((result) =>{
      if(result){
        const oppentEmail = result._code.oppentEmail;
        User.findOne({id:oppentEmail})
        .then((result) => {
          if(result){
            console.log('커플 아이디가 존재합니다.');
            res.json({result:1});
          }else{
            console.log('커플 아이디가 존재하지 않습니다.');
            res.json({result:5});
          }
        }) 
      }
    })
  }
}

const init_calendar = async (result) => {
  let check = null;
  check = result._code.codes;
  await Calendar.findOne({_code:check})
  .then(result=>{
    if(!result){
      const calendar = new Calendar({
        '_code': check,
        'sharedSchema':null,
        'wallpaperSchema': null
      });
        calendar.save((err)=>{
        if(err){
          return console.error(err);
        }else{
          return console.log('Calendar 생성');
        }
        })
    }else{
      return '존재합니다.';
    }
  })
}

 const init = async (result) => {
  let check = null;
  check = result._code.codes;
  return new Promise((resolve,reject)=>{
    resolve(Album.findOne({_code:check})
    .then(result=>{
      if(!result){
        const album = new Album({
          '_code': check,
          'dataSchema':null,
        });
          album.save((err)=>{
          if(err){
          console.error(err);
          }else{
          console.log('Albums 생성');
          }
          })
      }
    }));
    reject("에러발생");
  })  
}

const _main = (req,res,next) =>{
    const order = req.user._id;
    console.log(req.user);
    if(order){
      User.findOne({ _id: order })
      .then((result) =>{
        init(result).then((r) => {console.log("r:",r);
        init_calendar(result).then((r)=>{
          console.log("r:",r);
          let _img = null;
          let _oppentname = '';
          let _oppentEmail = '';
          let _name = null; 
          let _relDay = null;
          let _code = null;
          _oppentEmail =  result._code.oppentEmail;
          _code =  result._code.codes;
          console.log("codes:",_oppentEmail);
          _name = result.name;
          _relDay = result.relday;
          _relDay = datediff(_relDay);
          Album.findOne({ '_code' : _code })
          .then((result)=>{
            if(result){
              _img = result.wallpaperSchema.src;
            }
            next();
          })
          User.findOne({ 'id' : _oppentEmail })
          .then((r)=>{
            if(r){
              console.log('oppent찾기 성공:',r);
              _oppentname = r.name;
              res.json({result:1, 
                user_info:{
                  name: _name,
                  relDay: _relDay,
                  img: _img,
                  oppentname:_oppentname
                }
              });
            }else{
              console.log('oppent찾기 실패');
              res.json({result:0});
            }
          }).catch((err) => {
            console.log(err);
          });
        })  
      }) 
      })
    }else{
      res.json({result:0});
    }
  }


  const _getHome =(req,res) => {
    console.log(req.session);
    const _fMsg = req.flash();
    // console.log(_fMsg);
    if(_fMsg){
      res.json({result:2, fMsg:_fMsg});
    }else{
      res.json({result:0});
    }
  }

  const _postHome =(req,res) => {
    console.log(req.session);
    const ORDER = "deleteSession"
    const order = req.body.order;
    if(ORDER === order){
      req.session.destroy(()=>{return req.session;}); 
      res.json({result:1});
    }else{
      res.json({result:0});
    }
  }

  const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 const _upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
});

const _setbackground =(req,res) => {
  console.log("req.file:", req.file);
    const file = req.file;
    if(file){
      const order = req.user._id;
      const _filename = req.file.filename;
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
              console.log('wallpaperSchema 값이 있음',result.wallpaperSchema);
              const query = {'_code':result._code};
              if(result.wallpaperSchema!==null){
                _fsRemove(result.wallpaperSchema.src);
              }
              Album.updateOne(query,{$set:{wallpaperSchema: {size:_size, 
                                    originalname:_originalname, 
                                    src:_filename
                                  }}},(err,result)=>{
                if(err) throw new Error();
                else {
                  if(result.ok===1){
                Album.findOne({'_code':_code})
                .then((result)=>{
                  console.log(result.wallpaperSchema.src);
                  res.json({result:1, img:result.wallpaperSchema.src});
                })
              }
            }
          })
        .catch((err) => {
          console.log(err);
        });   
          })
        })
      }
    }else{
      res.json({result:0});
    }
}

const _fsRemove = (img) => {
  const directory = path.join(process.cwd()+'/public/uploads/'); 
  console.log("directory:",directory);
  console.log("image:",img);
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



module.exports = {
    mainMethod: _main, 
    getHome:_getHome,
    postHome:_postHome,
    upload:_upload,
    setbackground:_setbackground,
    checkLogin:_checkLogin
}