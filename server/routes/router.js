const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리
const passport = require('passport');
const User = require('../model/user');

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
  console.log(req.session);
  const email = req.body.email;
  const password = req.body.password;
  if(req.session.email !== email){
    req.session.email = email;
    req.session.password = password;
  }
  res.json({result:1});
  
})

router.post("/api/second", (req,res) => {
  console.log(req.session);
  const email = req.session.email;
  console.log(email);
  const invecode = req.body.invecode;
  if(email!==undefined&&email!==null&&email!==''){
    req.session.invecode = invecode;
    res.json({result:1});
  }else{
    res.json({result:0});
  }
})


router.post('/api/login', passport.authenticate('local', {
    failureRedirect: '/'
  }), (req, res) => {
    res.redirect('/');
  });

router.get("/api/customers", (req,res) =>{ // app 대신 router에 연결
    const customers = {id:1, firstName: "John"};
    res.json(customers);
});

module.exports = router; // 모듈로 만드는 부분