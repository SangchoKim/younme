const express = require('express');
const router = express.Router();
const alertInfo = require('../etc/method/alert').alertInfo; 
const chatInfo = require('../etc/method/chat').chatInfo;
const initUser = require('../etc/method/chat').initUser;
const chatPhoto = require('../etc/method/chat').chatPhoto;
const chatCamera = require('../etc/method/chat').chatCamera;
// const storageChat = require('../etc/method/chat').storageChat;
const chatGif = require('../etc/method/chat').chatGif;
const chatVideo = require('../etc/method/chat').chatVideo;
// const storageVideoChat = require('../etc/method/chat').storageVideoChat;
const chatAlbum = require('../etc/method/chat').chatAlbum;
const chatvoiceRecord = require('../etc/method/chat').chatvoiceRecord;
// const storageVoiceRecodeChat = require('../etc/method/chat').storageVoiceRecodeChat;
const {isLoggedIn,isNotLoggedIn} = require('./middleware');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv'); 
dotenv.config();

AWS.config.update({
  credentials:{
    accessKeyId:process.env.S3_ACCESS_KEY_ID,
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
  }, 
  region:'ap-northeast-2'
});

const storageVoiceRecodeChat = multer({
  storage: multerS3({
    s3:new AWS.S3(),
    bucket:'younme',
    acl: 'public-read', 
    key(req,file,cd){
      cd(null, `talkVoiceRecord/${+new Date()}${path.basename(file.originalname)}`)
    }
  }),
  limits:{fileSize: 1000000},
});

const storageVideoChat =  multer({
  storage: multerS3({
    s3:new AWS.S3(),
    bucket:'younme',
    acl: 'public-read', 
    key(req,file,cd){
      cd(null, `talkVideo/${+new Date()}${path.basename(file.originalname)}`)
    }
  }),
  limits:{fileSize: 1000000},
});

const storageChat = multer({
  storage: multerS3({
    s3:new AWS.S3(),
    bucket:'younme',
    acl: 'public-read', 
    key(req,file,cd){
      cd(null, `talkAlbum/${+new Date()}${path.basename(file.originalname)}`)
    }
  }),
  limits:{fileSize: 1000000},
});

router.post('/chat_info',isLoggedIn, async(req,res,next) =>{
    chatInfo(req,res,next);
})

router.get("/inituser", isLoggedIn, async(req,res,next) => {
  initUser(req,res,next);
});

router.patch("/chat_photo",isLoggedIn, storageChat.single("myImages"), async(req,res,next) => {
  chatPhoto(req,res,next);
});

router.patch("/chat_camera",isLoggedIn, storageChat.single("myImages"), async(req,res,next) => {
  chatCamera(req,res,next);
});

router.patch("/chat_video", isLoggedIn, storageVideoChat.single("videoFile"), async(req,res,next) => {
  chatVideo(req,res,next);
});

router.post('/chat_gif',isLoggedIn, async(req,res,next) =>{
  chatGif(req,res,next);
})

router.post('/chat_album',isLoggedIn, async(req,res,next) =>{
  chatAlbum(req,res,next);
})

router.patch("/chat_voicerecord", isLoggedIn, storageVoiceRecodeChat.single("voiceRecord"), async(req,res,next) => {
  chatvoiceRecord(req,res,next);
});

router.get('/getAlert',isLoggedIn, async(req,res,next) =>{
  alertInfo(req,res,next);
})

module.exports = router;