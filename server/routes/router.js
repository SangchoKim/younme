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
  const email = req.body.email;
  const password = req.body.password;
  let _mycode = '';
  if(req.session.email !== email){
    req.session.email = email;
    req.session.password = password;
  }
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
  if(email){
    req.session.invecode = invecode;
    req.session.mycode = mycode;
    console.log(req.session);
    res.json({result:1});
  }else{
    res.json({result:0});
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
    user.id = email;
    user.password = req.session.password;
    user.name = _name;
    user.birth =_birthday;
    user.relday = _relday;
    if(_man)
    user.gender = "man";
    else if(_women)
    user.gender = "women";
    user.code = req.session.invecode+req.session.mycode+_relday;
    user.save((err)=>{
      if(err){
        console.error(err);
        res.json({result: 0});
        return;
      }else{
        console.log('회원가입 성공')
        res.json({result: 1}); 
      }
    })
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
    failureRedirect: 'localhost'   // 여기 고쳐야함
  }), (req, res) => {
    console.log('성공');
    res.json({result:1});
  });

router.get("/api/customers", (req,res) =>{ // app 대신 router에 연결
    const customers = {id:1, firstName: "John"};
    res.json(customers);
});

module.exports = router; // 모듈로 만드는 부분