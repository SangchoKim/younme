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
router.get("/home", (req,res) => {
  getHome(req,res);
})


router.post("/home", (req,res) => {
  postHome(req,res);
})



router.post("/first", (req,res) => {  
  first_signUp(req,res);
})

router.post("/secondCodeSave", (req,res) => {
  secondCodeSave(req,res);
})

router.post("/second", (req,res) => {
  second_signUp(req,res); 
})

router.post("/backtofirst", (req,res) => {
  backtofirst(req,res);
})

router.post("/third", (req,res) => {
  third_signUp(req,res);
  
})

router.post("/backtosecond", (req,res) => {
  backtosecond(req,res);
})


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/home', failureFlash:true,   
  }), (req, res) => {
    console.log('성공');
    checkLogin(req,res);
  });


  router.get("/main", (req,res) => {
    const _momorial = req.query.momorial;
    if(_momorial){
      console.log(_momorial);
      menorialMethod(req,res);
    }else{
      mainMethod(req,res);
    }
  }) 

  router.post("/updatealbum", modiAlbum.single("myImage") , (req,res) => {
    updatealbum(req,res);
  })


  router.post("/setbackground", upload.single("myImage") , (req,res) => {
    setbackground(req,res);
  })

  router.post("/setalbum", uploadAlbum.single("myImages") , (req,res) => {
    setalbum(req,res);
  })

  router.get("/mypage", (req,res) => {
    mypage(req,res);
  });

  router.get("/changeGender", (req,res) =>{
    changeGender(req,res);
  });

  

  router.post("/changeinfo", (req,res) =>{
    changeinfo(req,res);
  });

  router.post("/setcalendar", (req,res) =>{
    setcalendar(req,res);
  });

  router.get("/readcalendar", (req,res) =>{
    readcalendar(req,res);
  });

  router.get("/deletecalendar", (req,res) =>{
    deletecalendar(req,res);
  });

  router.patch("/updatecalendar", (req,res) =>{
    updatecalendar(req,res);
  });

  router.post("/changebirth", (req,res) =>{
    changebirth(req,res);
    
  });

  router.get("/logout", (req,res) =>{ 
    logout(req,res);
});

router.get("/album", (req,res) =>{ 
  albumRead(req,res);
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