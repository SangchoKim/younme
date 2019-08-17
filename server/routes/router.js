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
  getHome(req,res);
})


router.post("/api/home", (req,res) => {
  postHome(req,res);
})



router.post("/api/first", (req,res) => {  
  first_signUp(req,res);
})

router.post("/api/secondCodeSave", (req,res) => {
  secondCodeSave(req,res);
})

router.post("/api/second", (req,res) => {
  second_signUp(req,res); 
})

router.post("/api/backtofirst", (req,res) => {
  backtofirst(req,res);
})

router.post("/api/third", (req,res) => {
  third_signUp(req,res);
  
})

router.post("/api/backtosecond", (req,res) => {
  backtosecond(req,res);
})


router.post('/api/login', passport.authenticate('local', {
    failureRedirect: '/api/home', failureFlash:true  
  }), (req, res) => {
    console.log('성공');
    checkLogin(req,res);
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

  router.post("/api/updatealbum", modiAlbum.single("myImage") , (req,res) => {
    updatealbum(req,res);
  })


  router.post("/api/setbackground", upload.single("myImage") , (req,res) => {
    setbackground(req,res);
  })

  router.post("/api/setalbum", uploadAlbum.single("myImages") , (req,res) => {
    setalbum(req,res);
  })

  router.get("/api/mypage", (req,res) => {
    mypage(req,res);
  });

  router.get("/api/changeGender", (req,res) =>{
    changeGender(req,res);
  });

  router.post("/api/changeinfo", (req,res) =>{
    changeinfo(req,res);
  });

  router.post("/api/setcalendar", (req,res) =>{
    setcalendar(req,res);
  });

  router.post("/api/changebirth", (req,res) =>{
    changebirth(req,res);
    
  });

  router.get("/api/logout", (req,res) =>{ 
    logout(req,res);
});

router.get("/api/album", (req,res) =>{ 
  albumRead(req,res);
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