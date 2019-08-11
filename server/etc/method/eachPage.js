const datediff = require('../../../src/lib/moment').datediff;
const User = require('../../model/user');
const tempCode = require('../../model/code');
const Album = require('../../model/album');
const dateCal = require('../../../src/lib/moment').dateCal;
const crypto = require('crypto');
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

 const init = async (result) => {
  let check = null;
  check = result._code.codes;
  return new Promise((resolve,reject)=>{
    resolve(Album.findOne({_code:check})
    .then(result=>{
      if(!result){
        const album = new Album({
          '_code': check,
          'sharedSchema':null,
          'wallpaperSchema': null
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
    if(order){
      User.findOne({ _id: order })
      .then((result) =>{
        init(result).then((r) => {console.log("r:",r);
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
    }else{
      res.json({result:0});
    }
  }

  const _menorial = (req,res) => {
    const order = req.user._id;
    if(order){
      User.findOne({ _id: order })
      .then((result) =>{
        let _calDay = null;
        let _oppentname = '';
        let _oppenetbirthday = '';
        const _birth = result.birth;
        const _name = result.name;
        let _relDay = result.relday;
        _relDay = datediff(_relDay);
        _calDay = dateCal(_relDay);
        console.log("codes:",result._code.oppentEmail);
        User.findOne({ 'id' : result._code.oppentEmail })
        .then((r)=>{
          if(r){
            console.log('oppent찾기 성공:',r);
            _oppentname = r.name;
            _oppenetbirthday = r.birth;
            res.json({result:1, 
              user_info:{
                name: _name,
                relDay: _relDay,
                calDay: {first:_calDay[0],
                        second:_calDay[1],
                        third:_calDay[2],
                        forth:_calDay[3]
                        },
                birth: _birth,
                oppenetbirthday: _oppenetbirthday,
                oppentname:_oppentname
              }
            });
          }else{
            console.log('oppent찾기 실패');
            res.json({result:0});
          }
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

  
  const _first_signUp =(req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  let _mycode = '';
  req.session.email = email;
  req.session.password = password;

  tempCode.findOne({ userMail1: email })
  .then(result=>{
    if(result){
      if(req.session.mycode){
        _mycode = req.session.mycode;
      }
      console.log(req.session);
      res.json({result:1,mycode:_mycode});
      return;
    }
  })

  const _tempCode = new tempCode({
    userMail1:email
  });
  _tempCode.save((err)=>{
    if(err){
      console.error(err);
      res.json({result: 0});
      return;
    }else{
      console.log('temp_code insert 성공');
      if(req.session.mycode){
        _mycode = req.session.mycode;
      }
      console.log(req.session);
      res.json({result:1,mycode:_mycode});
    }
  })
  }

  const _backtofirst =(req,res) => {
    console.log(req.session);
    const ORDER = "readEmail"
    const order = req.body.order;
    if(ORDER === order){
      const _email = req.session.email;
      console.log("backtofirst:",_email);  
      res.json({result:1,email:_email});
      // tempCode.deleteOne({userMail1:_email},(err,result)=>{
      //         if(err) console.log(err);
      //         else{
      //           if(result.ok===1){
                  
      //           }
      //         }
      //       })  
    }else{
      res.json({result:0});
    }
  }

  const _secondCodeSave =(req,res) => {
    const mycode = req.body.mycode;
    const email = req.session.email;
    console.log("mycode:",mycode);
     tempCode.findOne({ userMail1: email })
        .then(result=>{
          if(result){
            console.log("res",result);
            res.json({result: 1,code:result.code});
          }else{
            res.json({result: 0});
          }   
        });
      
    
  }

  
  const _second_signUp =(req,res) => {
    const email = req.session.email;
    console.log(email);
    const invecode = req.body.invecode;
    const mycode = req.body.mycode;
    const oppentEmail = req.body.oppentEmail;
    const query = {userMail1:email};
    tempCode.updateOne(query,{$set:{code: mycode}},(err,result)=>{  
      if(result.ok===1){
        tempCode.findOne({ userMail1: oppentEmail }) // 상대방 이메일이 temp 저장소에 등록되어 있는지 확인 
        .then(result=>{
          if(result){
            const compareCode = result.code;
            if(Number(compareCode)===Number(invecode)){  // 상대방 초대코드가 맞는지 확인
              console.log("모든 조건 비교 완료");
              req.session.userMail1 = email;
              req.session.mycode = mycode;
              req.session.c_code = Number(invecode)+Number(mycode);
              req.session.oppentEmail = oppentEmail;
              res.json({result: 1});
            }else{ // 상대방 초대 코드 비교 실패
              console.log("상대방 초대 코드 비교 실패");
              res.json({result: 10});
            }
          }else{ // 상대방이 이메일이 temp 저장소에 등록되어 있지 않음
            console.log("상대방이 이메일이 등록되어 있지 않음");
            res.json({result: 5});
          }
        })
      } 
    })
  }

  const _backtosecond =(req,res) => {
    console.log(req.session);
    const ORDER = "readmyCode"
    const order = req.body.order;
    if(ORDER === order){
      const _mycode = req.session.mycode;
      console.log("backtosecond:",_mycode);  
      res.json({result:1,mycode:_mycode});
    }else{
      res.json({result:0});
    }
  }

  const _third_signUp =(req,res) => {
    const email = req.session.email;
  console.log(email);
  const _man = req.body.man;
  const _women = req.body.women;
  const _name = req.body.name;
  const _birthday = req.body.birthday;
  const _relday = req.body.relday;
  if(email){
    
    crypto.randomBytes(64, (err, buf) => {
      const _pw = req.session.password;
      const _code = req.session.c_code;
      const _userMail1 = req.session.userMail1;
      const _oppentEmail = req.session.oppentEmail;
      crypto.pbkdf2(_pw , buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
        console.log('암호화된비밀번호:',key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
        console.log(_userMail1);
        let _gender = '';
        if(_man)
        _gender = "남성";
        else if(_women)
        _gender = "여성";
        const c = {codes:_code,
                    userMail1:_userMail1,
                    oppentEmail:_oppentEmail
                  };
        const user = new User({
                              id:email,
                              password:key.toString('base64'),
                              _salt:buf.toString('base64'),
                              name:_name,
                              birth:_birthday,
                              gender:_gender,
                              relday:_relday,
                              _code:c
                            });
        console.log(user);
        user.save((err)=>{
          if(err){
            console.error(err);
            res.json({result: 0});
            return;
          }else{
            console.log('회원가입 성공');
            req.session.destroy(()=>{return req.session;}); 
            res.json({result: 1});
                     
          }
        })
      });
    });
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

const storages = multer.diskStorage({
  destination: "./public/uploadsAlbum/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});
const _uploadAlbum = multer({
storage: storages,
limits:{fileSize: 1000000},
});

const _setalbum =(req,res) => {
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
            if(result.sharedSchema!==null){
              // 값이 있으므로 SHAREDALBUM Update
              console.log('sharedSchema 값이 있음',result.sharedSchema);
              const query = {'_code':result._code};
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
}

module.exports = {
    mainMethod: _main,
    menorialMethod : _menorial,
    getHome:_getHome,
    postHome:_postHome,
    first_signUp:_first_signUp,
    second_signUp:_second_signUp,
    backtofirst:_backtofirst,
    third_signUp:_third_signUp,
    backtosecond:_backtosecond,
    upload:_upload,
    uploadAlbum:_uploadAlbum,
    setbackground:_setbackground,
    setalbum:_setalbum,
    secondCodeSave:_secondCodeSave,
    checkLogin:_checkLogin
}