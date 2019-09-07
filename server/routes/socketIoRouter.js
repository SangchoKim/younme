const express = require('express');
const router = express.Router(); 
const User = require('../model/user');

router.get("/inituser", async(req,res,next) => {
    try {
        const order = req.user._id;
        const e = req.user._code.oppentEmail;
        const _code = req.user._code.codes;
        if(order){
            const r = await User.findOne({"id":e})
            console.log(r);
            User.findOne({_id:order})
            .then((result) => { 
              console.log("Read 성공:",result);
              const {name,id,intro} = result;
              const _oppentEmail = result._code.oppentEmail;
              res.json({results:1,
                      user_info:
                      {name:name,
                        email:id,
                        intro:intro,
                        oppentEmail:_oppentEmail,
                        oppentName:r.name,
                    }});
            })
            .catch((err) => {
              console.log(err);
            });    
          }else{
            res.json({result:5});
          }  
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;