const express = require('express');
const router = express.Router(); // 라우터 분리
const passport = require('passport');
const mainMethod = require('../etc/method/eachPage').mainMethod;
const menorialMethod = require('../etc/method/memorialDay').menorialMethod;
const getHome = require('../etc/method/eachPage').getHome;
const postHome = require('../etc/method/eachPage').postHome;
const first_signUp = require('../etc/method/signUp').first_signUp;
const second_signUp = require('../etc/method/signUp').second_signUp;
const backtofirst = require('../etc/method/signUp').backtofirst;
const third_signUp = require('../etc/method/signUp').third_signUp;
const backtosecond = require('../etc/method/signUp').backtosecond;
const upload = require('../etc/method/eachPage').upload;
const uploadAlbum = require('../etc/method/album').uploadAlbum;
const modiAlbum = require('../etc/method/album').modiAlbum;
const setbackground = require('../etc/method/eachPage').setbackground;
const setalbum = require('../etc/method/album').setalbum;
const mypage = require('../etc/method/mypage').mypage;
const changeGender = require('../etc/method/mypage').changeGender;
const changeinfo = require('../etc/method/mypage').changeinfo;
const changebirth = require('../etc/method/mypage').changebirth;
const logout = require('../etc/method/mypage').logout;
const secondCodeSave = require('../etc/method/signUp').secondCodeSave;
const checkLogin = require('../etc/method/eachPage').checkLogin;
const albumRead = require('../etc/method/album').albumRead;
const updatealbum = require('../etc/method/album').updatealbum;
const setcalendar = require('../etc/method/calendar').setcalendar;
const readcalendar = require('../etc/method/calendar').readcalendar;
const deletecalendar = require('../etc/method/calendar').deletecalendar;
const updatecalendar = require('../etc/method/calendar').updatecalendar;
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
// router.post("/first", (req,res) => {
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
router.get("/home", (req,res,next) => {
  getHome(req,res,next);
})


router.post("/home", (req,res,next) => {
  postHome(req,res,next);
})



router.post("/first", (req,res,next) => {  
  first_signUp(req,res,next);
})

router.post("/secondCodeSave", (req,res,next) => {
  secondCodeSave(req,res,next);
})

router.post("/second", (req,res,next) => {
  second_signUp(req,res,next); 
})

router.post("/backtofirst", (req,res,next) => {
  backtofirst(req,res,next);
})

router.post("/third", (req,res,next) => {
  third_signUp(req,res,next);
  
})

router.post("/backtosecond", (req,res,next) => {
  backtosecond(req,res,next);
})


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/home', failureFlash:true,   
  }), (req, res,next) => {
    console.log('성공');
    checkLogin(req,res,next);
  });


  router.get("/main", (req,res,next) => {
    const _momorial = req.query.momorial;
    if(_momorial){
      console.log(_momorial);
      menorialMethod(req,res,next);
    }else{
      mainMethod(req,res,next);
    }
  }) 

  router.post("/updatealbum", modiAlbum.single("myImage") , (req,res,next) => {
    updatealbum(req,res,next);
  })


  router.post("/setbackground", upload.single("myImage") , (req,res,next) => {
    setbackground(req,res,next);
  })

  router.post("/setalbum", uploadAlbum.single("myImages") , (req,res,next) => {
    setalbum(req,res,next);
  })

  router.get("/mypage", (req,res,next) => {
    mypage(req,res,next);
  });

  router.get("/changeGender", (req,res,next) =>{
    changeGender(req,res,next);
  });

  

  router.post("/changeinfo", (req,res,next) =>{
    changeinfo(req,res,next);
  });

  router.post("/setcalendar", (req,res,next) =>{
    setcalendar(req,res,next);
  });

  router.get("/readcalendar", (req,res,next) =>{
    readcalendar(req,res,next);
  });

  router.get("/deletecalendar", (req,res,next) =>{
    deletecalendar(req,res,next);
  });

  router.patch("/updatecalendar", (req,res,next) =>{
    updatecalendar(req,res,next);
  });

  router.post("/changebirth", (req,res,next) =>{
    changebirth(req,res,next);
    
  });

  router.get("/logout", (req,res,next) =>{ 
    logout(req,res,next);
});

router.get("/album", (req,res,next) =>{ 
  albumRead(req,res,next);
});

router.get('/facebook', passport.authenticate('facebook', {
  authType: 'rerequest', scope: ['public_profile', 'email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  console.log('성공');
    res.json({result:1});
});

router.get("/customers", (req,res) =>{ // app 대신 router에 연결
    const customers = {id:1, firstName: "John"};
    res.json(customers);
});

module.exports = router; // 모듈로 만드는 부분