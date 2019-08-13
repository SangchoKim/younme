const tempCode = require('../../model/code');
const User = require('../../model/user');
const crypto = require('crypto');

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
  
module.exports = {
  first_signUp:_first_signUp,
  second_signUp:_second_signUp,
  backtofirst:_backtofirst,
  third_signUp:_third_signUp,
  backtosecond:_backtosecond,
  secondCodeSave:_secondCodeSave,
}