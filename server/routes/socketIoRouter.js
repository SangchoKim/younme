const express = require('express');
const router = express.Router(); 
const chatInfo = require('../etc/method/chat');
const initUser = require('../etc/method/chat');
const chatPhoto = require('../etc/method/chat');
const chatCamera = require('../etc/method/chat');
const storageChat = require('../etc/method/chat');


router.post('/chat_info',async(req,res,next) =>{
    chatInfo(req,res,next);
})

router.get("/inituser", async(req,res,next) => {
  initUser(req,res,next);
});

router.patch("/chat_photo", storageChat.single("myImage"), async(req,res,next) => {
  chatPhoto(req,res,next);
});

router.patch("/chat_camera", storageChat.single("myImage"), async(req,res,next) => {
  chatCamera(req,res,next);
});

module.exports = router;