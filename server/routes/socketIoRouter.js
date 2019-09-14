const express = require('express');
const router = express.Router(); 
const chatInfo = require('../etc/method/chat').chatInfo;
const initUser = require('../etc/method/chat').initUser;
const chatPhoto = require('../etc/method/chat').chatPhoto;
const chatCamera = require('../etc/method/chat').chatCamera;
const storageChat = require('../etc/method/chat').storageChat;
const chatGif = require('../etc/method/chat').chatGif;
const chatVideo = require('../etc/method/chat').chatVideo;
const storageVideoChat = require('../etc/method/chat').storageVideoChat;
const chatAlbum = require('../etc/method/chat').chatAlbum;

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

router.patch("/chat_video", storageVideoChat.single("videoFile"), async(req,res,next) => {
  chatVideo(req,res,next);
});

router.post('/chat_gif',async(req,res,next) =>{
  chatGif(req,res,next);
})

router.post('/chat_album',async(req,res,next) =>{
  chatAlbum(req,res,next);
})

module.exports = router;