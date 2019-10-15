const User = require('../../model/user');


const _mypage =(req,res,next) => {
  try {
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
        const _oppentEmail = result._code.oppentEmail;
        res.json({result:1,
                user_info:
                {name:_name,
                birthday:_birthday,
                email:_email,
                gender:_gender,
                intro:_intro,
                oppentEmail:_oppentEmail
              }});
      })
      .catch((err) => {
        console.log(err);
      });    
    }else{
      res.json({result:0});
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
    
  }

  const _changeGender =(req,res,next) => {
    try {
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
    }else{
      res.json({result:0});
    } 
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }

  const _changeinfo =(req,res,next) => {
    try {
      const _info = req.body.info;
    const order = req.user._id;
    if(order){
      User.findAndModify({ _id: order },[], { $set: { intro: _info } }, {}, (err,user)=>{
        if(err) console.log(err);
        else 
        User.findOne({ _id: order })
        .then(results => {
          res.json({result:1, intro:results.intro});
        })
        
      });
    }else{
      res.json({result:0});
    }
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }

  const _changebirth =(req,res,next) => {
    try {
    const _birth = req.body.birth;
    const order = req.user._id;
    if(order){
      User.findAndModify({ _id: order },[], { $set: { birth: _birth } }, {},(err,user)=>{
        if(err) console.log(err);
        else 
        User.findOne({ _id: order })
        .then(results => {
          res.json({result:1, birthday:results.birth});
        })
      });
    }else{
      res.json({result:0});
    }
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }

  const _logout =(req,res,next) => {
    try {
      const order = req.user._id;
    if(order){
      User.findOne({ _id: order },(err,user)=>{
        if(err) console.log(err);
        else 
        console.log('로그아웃 성공');
        req.session.destroy(()=>{return req.session;}); 
        res.json({result: 1});
      });
    }else{
      res.json({result:0});
    }
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }



module.exports = {
    mypage: _mypage,
    changeGender: _changeGender,
    changeinfo: _changeinfo,
    changebirth: _changebirth,
    logout: _logout,
}