const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리
const passport = require('passport');
const User = require('../model/user');
const crypto = require('crypto');
const multer = require('multer');
const mainMethod = require('../etc/method/eachPage').mainMethod;
const menorialMethod = require('../etc/method/eachPage').menorialMethod;
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../../src/img/uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, new Date().valueOf() + path.extname(file.originalname));
//     }
//   }),
// });
// // insert 방식
// router.post("/api/first", (req,res) => {
//     const user = new User();
//     user.id = req.body.email;
//     user.password = req.body.password;
//     user.save((err)=>{
//       if(err){
//         console.error(err);
//         res.json({result: 0});
//         return;
//       }else{
//         console.log('회원가입 Insert 성공')
//         res.json({result: 1}); 
//       }
//     })
// })
router.get("/api/home", (req,res) => {
  console.log(req.session);
  const _fMsg = req.flash();
  // console.log(_fMsg);
  if(_fMsg){
    res.json({result:2, fMsg:_fMsg});
  }else{
    res.json({result:0});
  }
})


router.post("/api/home", (req,res) => {
  console.log(req.session);
  const ORDER = "deleteSession"
  const order = req.body.order;
  if(ORDER === order){
    req.session.destroy(()=>{return req.session;}); 
    res.json({result:1});
  }else{
    res.json({result:0});
  }
})



router.post("/api/first", (req,res) => {  
  const email = req.body.email;
  const password = req.body.password;
  let _mycode = '';
  req.session.email = email;
  req.session.password = password;
  if(req.session.mycode){
    _mycode = req.session.mycode;
  }
  console.log(req.session);
  res.json({result:1,mycode:_mycode});
})

router.post("/api/second", (req,res) => {
  
  const email = req.session.email;
  console.log(email);
  const invecode = req.body.invecode;
  const mycode = req.body.mycode;
  let c = false;
  let c_code = 0;
  if(!c){
    c_code = invecode + mycode;
    req.session.c_code = c_code;
  }

if(c_code===req.session.c_code){
  // 디비 접근 필요 할듯 나중에
    c = true;
  if(email&&c){
    req.session.invecode = invecode;
    req.session.mycode = mycode;
    console.log(req.session);
    res.json({result:1});
  }else{
    c = false;
    res.json({result:0});
  }
}
})

router.post("/api/backtofirst", (req,res) => {
  console.log(req.session);
  const ORDER = "readEmail"
  const order = req.body.order;
  if(ORDER === order){
    const _email = req.session.email;
    console.log("backtofirst:",_email);  
    res.json({result:1,email:_email});
  }else{
    res.json({result:0});
  }
})

router.post("/api/third", (req,res) => {
  
  const email = req.session.email;
  console.log(email);
  const _man = req.body.man;
  const _women = req.body.women;
  const _name = req.body.name;
  const _birthday = req.body.birthday;
  const _relday = req.body.relday;
  if(email){
    const user = new User();
    crypto.randomBytes(64, (err, buf) => {
      const _pw = req.session.password;
      const _code = req.session.invecode+req.session.mycode;
      crypto.pbkdf2(_pw , buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
        console.log('암호화된비밀번호:',key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
        user.password = key.toString('base64');
        user._salt = buf.toString('base64');
        user.id = email; 
        user.name = _name;
        user.birth =_birthday;
        user.relday = _relday;
        if(_man)
        user.gender = "남성";
        else if(_women)
        user.gender = "여성";
        user.code = _code;
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
})

router.post("/api/backtosecond", (req,res) => {
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
})


router.post('/api/login', passport.authenticate('local', {
    failureRedirect: '/api/home', failureFlash:true  
  }), (req, res) => {
    console.log('성공');
    res.json({result:1});
  });


  router.get("/api/main", (req,res) => {
    const _momorial = req.query.momorial;
    if(_momorial){
      console.log(_momorial);
      menorialMethod(req,res);
    }else{
      mainMethod(req,res);
    }
  }) 

 

  const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
});

  router.post("/api/setbackground", upload.single("myImage") , (req,res) => {
    console.log("req.file:", req.file);
    const file = req.file;
    if(file){
      const order = req.user._id;
      const _filename = req.file.filename;
      const _originalname = req.file.originalname;
      const _size = req.file.size;
      if(order){
        User.findOne({ _id: order })
        .then((result)=>{
          console.log(result);
          const query = {_id:order};
          User.updateOne(query,{$set:{image: {size:_size, 
                                originalname:_originalname, 
                                src:_filename
                              }}},(err,result)=>{
            if(err) throw new Error();
            else {
              if(result.ok===1){
                User.findOne({_id:order})
                .then((result)=>{
                  console.log(result.image.src);
                  res.json({result:1, img:result.image.src});
                })
              }
            }
          })
      .catch((err) => {
        console.log(err);
      });
        })
      }
    }else{
      res.json({result:0});
    }
  })

  router.get("/api/mypage", (req,res) => {
    const order = req.user._id;
    if(order){
      User.findOne({_id:order})
      .then((result) => {
        console.log("Read 성공:");
        const _name = result.name;
        const _birthday = result.birth;
        const _email = result.id;
        const _gender = result.gender;
        const _intro = result.intro;
        res.json({result:1,
                user_info:
                {name:_name,
                birthday:_birthday,
                email:_email,
                gender:_gender,
                intro:_intro
              }});
      })
      .catch((err) => {
        console.log(err);
      });    
    }else{
      res.json({result:0});
    }
  });

  router.get("/api/changeGender", (req,res) =>{
    const _gender = req.query.gender;
    const order = req.user._id;
    if(order){
      User.findOne({ _id: order })
      .then((result)=>{
          console.log(result);
          const query = {_id:order};
          User.updateOne(query,{$set:{gender: _gender}},(err,result)=>{
            if(err) throw new Error();
            else {
              if(result.ok===1){
                User.findOne({_id:order})
                .then((result)=>{
                  console.log(result.gender);
                  res.json({result:1, gender:result.gender});
                })
                
              }
              
            }
          })
      }).catch((err) => {
        console.log(err);
      });


      // User.findAndModify({ _id: order },[], { $set: { gender: _gender } }, {}, (err,user)=>{
      //   if(err) console.log(err);
      //   else console.log("changed gender", user);
      //   res.json({result:1, gender:user.value.gender});
      // });
    }else{
      res.json({result:0});
    }
    
  });

  router.post("/api/changeinfo", (req,res) =>{
    const _info = req.body.info;
    const order = req.user._id;
    if(order){
      User.findAndModify({ _id: order },[], { $set: { intro: _info } }, {}, (err,user)=>{
        if(err) console.log(err);
        else console.log("changedIntro", user);
        res.json({result:1, intro:user.value.intro});
      });
    }else{
      res.json({result:0});
    }
    
  });

  router.post("/api/changebirth", (req,res) =>{
    const _birth = req.body.birth;
    const order = req.user._id;
    if(order){
      User.findAndModify({ _id: order },[], { $set: { birth: _birth } }, {},(err,user)=>{
        if(err) console.log(err);
        else console.log("changedBirth", user);
        res.json({result:1, birthday:user.value.birth});
      });
    }else{
      res.json({result:0});
    }
    
  });

  router.get("/api/logout", (req,res) =>{ 
  req.logOut();
  req.session.destroy(()=>{return req.session;}); 
  res.json({result:1});
});

router.get('/api/facebook', passport.authenticate('facebook', {
  authType: 'rerequest', scope: ['public_profile', 'email']
}));

router.get('/api/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  console.log('성공');
    res.json({result:1});
});

router.get("/api/customers", (req,res) =>{ // app 대신 router에 연결
    const customers = {id:1, firstName: "John"};
    res.json(customers);
});

module.exports = router; // 모듈로 만드는 부분