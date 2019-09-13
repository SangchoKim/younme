const express = require('express');
const router = express.Router(); 
const chatInfo = require('../etc/method/chat').chatInfo;
const initUser = require('../etc/method/chat').initUser;
const chatPhoto = require('../etc/method/chat').chatPhoto;
const chatCamera = require('../etc/method/chat').chatCamera;
const storageChat = require('../etc/method/chat').storageChat;
const chatGif = require('../etc/method/chat').chatGif;

router.post('/chat_info',async(req,res,next) =>{
    chatInfo(req,res,next);
})

router.get("/inituser", async(req,res,next) => {
  initUser(req,res,next);
});

router.patch("/chat_photo", storageChat.single("myImages"), async(req,res,next) => {
  chatPhoto(req,res,next);
});

router.patch("/chat_camera", storageChat.single("myImages"), async(req,res,next) => {
  chatCamera(req,res,next);
});

router.post('/chat_gif',async(req,res,next) =>{
  chatGif(req,res,next);
})

module.exports = router;