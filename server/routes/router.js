const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리
const passport = require('passport');
const User = require('../model/user');


router.post("/api/first", (req,res) => {
    const user = new User();
    user.id = req.body.email;
    user.password = req.body.password;
    user.save((err)=>{
      if(err){
        console.error(err);
        res.json({result: 0});
        return;
      }else{
        console.log('회원가입 Insert 성공')
        res.json({result: 1}); 
      }
    })
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