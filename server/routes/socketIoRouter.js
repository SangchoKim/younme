const express = require('express');
const router = express.Router(); 
const User = require('../model/user');
const Chat = require('../model/chat');


router.post('/chat_info',async(req,res,next) =>{
  try {
    
    const shared_code = req.user._code.codes;
    const {uuid,comment,sender,getter,reg_time} = req.body;
    const query = {'_code':shared_code};
    Chat.updateOne(query,{$addToSet:{'dataSchema': 
            {'sender':sender, 
            'getter':getter,
            'comment':comment,
            'gif':null,
            'cratedAt':reg_time,
            }}},(err,result) => {
              if(err) console.error(err);
              // 데이터 내용 뿌려주기 
              const do_sendData = {
                message: comment,
                uid:uuid,
                reg_time:reg_time,
                getter:getter,
                sender:sender,
              } 
              // console.log('rooms',req.app.get('io').of('/chat').adapter.rooms);
              // console.log(req.app.get('io').of('/chat').sockets);
              req.app.get('io').of('/chat').to(shared_code).emit('message', do_sendData ); // 키, 값
            })
  } catch (error) {
    console.error(error);
    next();
  }
})

router.get("/inituser", async(req,res,next) => {
    try {
        const limit = req.query.limit;
        const order = req.user._id;
        const e = req.user._code.oppentEmail;
        const _code = req.user._code.codes;
        let chatss = [];
        let _chat_info = null;
        console.log('limit',limit);
        if (await order){
            const r = await User.findOne({"id":e});
            console.log(r);
            Chat.findOne({"_code":parseInt(_code)})
            .then((r) => {
              if(r){
                // 채팅 DB가 있는 경우 => read
                
                chatss = r;
              }else{
                // 채팅 DB가 없는 경우 => db 만든다.
                console.log('채팅티비가 없는경우');
                const _chat = new Chat({
                  user:null,
                  comment:null,
                  gif:null,
                  _code:_code,
                });
                _chat.save((err)=>{
                  if(err)
                  console.error(err);
                  else
                  return null;
                })
              }
            }
            ).catch((err) => {
              console.error(err);
            })
            // const chatss = await _getChat(_code,next);
            setTimeout(() => {
             User.findOne({_id:order})
            .then((result) => { 
              console.log("Read 성공:",result);
              const {name,id,intro} = result;
              const _oppentEmail = result._code.oppentEmail;
              console.log("채팅테이블info:",chatss.dataSchema[0]);
              if(chatss){
                const min = limit - 10;
                const max = limit;
                chatss = chatss.dataSchema.slice(min,max);
                // chatss = chatss.dataSchema;
                console.log("_chat_info",chatss);
              }
                res.json({results:1,
                  user_info:{
                            name:name,
                            email:id,
                            intro:intro,
                            oppentEmail:_oppentEmail,
                            oppentName:r.name,
                            _code:_code,
                            },
                  chat_info:chatss,
              });
              
            })
            .catch((err) => {
              console.log(err);
            });  
            }, 300);
              
          }else{
            res.json({result:5});
          }  
    } catch (e) {
        console.error(e);
        next(e);
    }
});

const _getChat = (_code,next) => {
  try {
    
  } catch (err) {
    console.error(err);
    next();
  }
  
}

module.exports = router;