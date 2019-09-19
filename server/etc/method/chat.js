const User = require('../../model/user');
const Chat = require('../../model/chat');
const multer = require('multer');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const uuids = require('uuid/v1');

const uid = uuids();

const _voiceStorage = multer.diskStorage({
  destination: "./public/uploadsVoiceRecodeChat/",
  filename: function(req, file, cb){
     cb(null,"VoiceRecode-" + Date.now() + path.extname(file.originalname));
  }
});

const _storageVoiceRecodeChat = multer({
  storage: _voiceStorage,
  limits:{fileSize: 1000000},
});

const _storage = multer.diskStorage({
  destination: "./public/uploadsVideoChat/",
  filename: function(req, file, cb){
     cb(null,"Video-" + Date.now() + path.extname(file.originalname));
  }
});

const _storageVideoChat = multer({
  storage: _storage,
  limits:{fileSize: 1000000},
});

const s = multer.diskStorage({
  destination: "./public/uploadsChat/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const _storageChat = multer({
  storage: s,
  limits:{fileSize: 1000000},
});

const _chatInfo = async(req,res,next) => {
    try {
      const shared_code = req.user._code.codes;
      const {uuid,comment,sender,getter,reg_time} = req.body;
      const query = {'_code':shared_code};
      console.log('chatMessage 준비',shared_code,comment,sender,getter);
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
                  gif:null,
                  uid:uid,
                  reg_time:reg_time,
                  getter:getter,
                  sender:sender,
                } 
                // console.log('rooms',req.app.get('io').of('/chat').adapter.rooms);
                // console.log(req.app.get('io').of('/chat').sockets);
                req.app.get('io').of('/chat').to(shared_code).emit('message', do_sendData ); // 키, 값
                res.json({results:1});
              })
    } catch (error) {
      console.error(error);
      next();
    }
}

const _chatPhoto = async(req,res,next) => {
  try {
    console.log("req.file:", req.file);
    const shared_code = req.user._code.codes;
    const {sender,getter} =  req.query;
    const {size,filename,originalname} = req.file;
    console.log('chatPhoto 준비',shared_code,originalname,filename,size);
    const image = {'size':size,'filename':filename,'originalname':originalname};
    const query = {'_code':shared_code};
    Chat.updateOne(query,{$addToSet:{'dataSchema': 
            {'sender':sender, 
            'getter':getter,
            'comment':null,
            'gif':image,
            'cratedAt':moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
            }}},(err,result) => {
              if(err) console.error(err);
              // 데이터 내용 뿌려주기 
              const do_sendData = {
                message: null,
                gif:[image],
                uid:uid,
                reg_time:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
                getter:getter,
                sender:sender,
              } 
              // console.log('rooms',req.app.get('io').of('/chat').adapter.rooms);
              // console.log(req.app.get('io').of('/chat').sockets);
              req.app.get('io').of('/chat').to(shared_code).emit('photo', do_sendData ); // 키, 값
              res.json({results:1});
            })
  } catch (error) {
    console.error(error);
    next();
  }
}

const _chatCamera = async(req,res,next) => {
  try {
    console.log("req.file:", req.file);
    const shared_code = req.user._code.codes;
    const {sender,getter} =  req.query;
    const {size,filename,originalname} = req.file;
    console.log('chatPhoto 준비',shared_code,originalname,filename,size);
    const image = {'size':size,'filename':filename,'originalname':originalname};
    const query = {'_code':shared_code};
    Chat.updateOne(query,{$addToSet:{'dataSchema': 
            {'sender':sender, 
            'getter':getter,
            'comment':null,
            'gif':image,
            'cratedAt':moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
            }}},(err,result) => {
              if(err) console.error(err);
              // 데이터 내용 뿌려주기 
              const do_sendData = {
                message: null,
                gif:[image],
                uid:uid,
                reg_time:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
                getter:getter,
                sender:sender,
              } 
              // console.log('rooms',req.app.get('io').of('/chat').adapter.rooms);
              // console.log(req.app.get('io').of('/chat').sockets);
              req.app.get('io').of('/chat').to(shared_code).emit('camera', do_sendData ); // 키, 값
              res.json({results:1});
            })
      } catch (error) {
        console.error(error);
        next();
      }
}

const _chatGif = async(req,res,next) => {
  try {
    const shared_code = req.user._code.codes;
    const {gifKey,sender,getter} = req.body;
    console.log('chatGif 준비',shared_code,gifKey,sender,getter);
    const image = {'size':0,'gifname':gifKey,'originalname':gifKey};
    const query = {'_code':shared_code};
    Chat.updateOne(query,{$addToSet:{'dataSchema': 
            {'sender':sender, 
            'getter':getter,
            'comment':null,
            'gif':image,
            'cratedAt':moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
            }}},(err,result) => {
              if(err) console.error(err);
              // 데이터 내용 뿌려주기 
              const do_sendData = {
                message: null,
                gif:[image],
                uid:uid,
                reg_time:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
                getter:getter,
                sender:sender,
              } 
              // console.log('rooms',req.app.get('io').of('/chat').adapter.rooms);
              // console.log(req.app.get('io').of('/chat').sockets);
              req.app.get('io').of('/chat').to(shared_code).emit('gif', do_sendData ); // 키, 값
              res.json({results:1});
            })
      } catch (error) {
        console.error(error);
        next();
      }
}

const _chatVideo = async(req,res,next) => {
  try {
    console.log("req.file:", req.file);
    const shared_code = req.user._code.codes;
    const {sender,getter} =  req.query;
    const {size,filename,originalname} = req.file;
    console.log('chatVideo 준비',shared_code,originalname,filename,size);
    const image = {'size':size,'videoName':filename,'originalname':originalname};
    const query = {'_code':shared_code};
    Chat.updateOne(query,{$addToSet:{'dataSchema': 
            {'sender':sender, 
            'getter':getter,
            'comment':null,
            'gif':image,
            'cratedAt':moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
            }}},(err,result) => {
              if(err) console.error(err);
              // 데이터 내용 뿌려주기 
              const do_sendData = {
                message: null,
                gif:[image],
                uid:uid,
                reg_time:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
                getter:getter,
                sender:sender,
              } 
              // console.log('rooms',req.app.get('io').of('/chat').adapter.rooms);
              // console.log(req.app.get('io').of('/chat').sockets);
              req.app.get('io').of('/chat').to(shared_code).emit('video', do_sendData ); // 키, 값
              res.json({results:1});
            })
  } catch (error) {
    console.error(error);
    next();
  }
}

const _chatAlbum = async(req,res,next) => {
  try {
    const shared_code = req.user._code.codes;
    const {imageInfo,sender,getter} = req.body;
    console.log('chatAlbum 준비',shared_code,imageInfo,sender,getter);
    const image = imageInfo;
    const query = {'_code':shared_code};
    Chat.updateOne(query,{$addToSet:{'dataSchema': 
            {'sender':sender, 
            'getter':getter,
            'comment':null,
            'gif':image,
            'cratedAt':moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
            }}},(err,result) => {
              if(err) console.error(err);
              // 데이터 내용 뿌려주기 
              const do_sendData = {
                message: null,
                gif:image,
                uid:uid,
                reg_time:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
                getter:getter, 
                sender:sender,
              } 
              req.app.get('io').of('/chat').to(shared_code).emit('album', do_sendData ); // 키, 값
              res.json({results:1});
            })
      } catch (error) {
        console.error(error);
        next();
      }
}

const _chatvoiceRecord = async(req,res,next) => {
  try {
    console.log("req.file:", req.file);
    const shared_code = req.user._code.codes;
    const {sender,getter} =  req.query;
    const {size,filename,originalname} = req.file;
    console.log('chatVoiceRecord 준비',shared_code,originalname,filename,size);
    const image = {'size':size,'voiceRecordname':filename,'originalname':originalname};
    const query = {'_code':shared_code};
    Chat.updateOne(query,{$addToSet:{'dataSchema': 
            {'sender':sender, 
            'getter':getter,
            'comment':null,
            'gif':image,
            'cratedAt':moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
            }}},(err,result) => {
              if(err) console.error(err);
              // 데이터 내용 뿌려주기 
              const do_sendData = {
                message: null,
                gif:[image],
                uid:uid,
                reg_time:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
                getter:getter,
                sender:sender,
              } 
              // console.log('rooms',req.app.get('io').of('/chat').adapter.rooms);
              // console.log(req.app.get('io').of('/chat').sockets);
              req.app.get('io').of('/chat').to(shared_code).emit('voiceRecord', do_sendData ); // 키, 값
              res.json({results:1});
            })
      } catch (error) {
        console.error(error);
        next();
      }
}

const _initUser = async(req,res,next) => {
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
          let _length = null;
          if(chatss){
            const min = limit - limit;
            const max = limit;
            _length = chatss.dataSchema.length;
            if(_length -1 <=limit){
              const m = chatss.dataSchema.length;
              chatss = chatss.dataSchema.slice(min,m);
            }else{
              chatss = chatss.dataSchema.slice(min,max);
            }
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
              length:_length,
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
}

  
module.exports = {
    chatInfo: _chatInfo,
    initUser: _initUser,
    chatPhoto: _chatPhoto,
    chatCamera: _chatCamera,
    storageChat: _storageChat,
    chatGif: _chatGif,
    chatVideo:_chatVideo,
    storageVideoChat:_storageVideoChat,
    chatAlbum:_chatAlbum,
    chatvoiceRecord:_chatvoiceRecord,
    storageVoiceRecodeChat:_storageVoiceRecodeChat,
}