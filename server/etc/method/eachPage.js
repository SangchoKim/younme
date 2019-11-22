const {_dateDiff} = require('../../../src/lib/moment');
const User = require('../../model/user');
const Album = require('../../model/album');
const Calendar = require('../../model/calendar');
const Alert = require('../../model/alert');
const Tempcodes = require('../../model/code');

const _alertFindOne = async(join_code, req, next) => {
  try {
    const order = req.user._id;
    const oppentEmail = req.user._code.oppentEmail;

    const userData = await User.findOne({'_id':order});
    const oppentData = await User.findOne({'id':oppentEmail}); 
    const alertData = await Alert.findOne({"_code":parseInt(join_code)}); 
  if(alertData){
    console.log('Alert_데이터가 존재합니다.');
    const index = alertData.dataSchema.length - 1;
    const _sendData = await {
                            _code:alertData._code,
                            number:alertData.dataSchema[index].number,
                            crud:alertData.dataSchema[index].crud,
                            name:userData.name,
                            oppentName:oppentData.name,
                            cratedAt:alertData.dataSchema[index].cratedAt,
                            }
                            
    req.app.get('io').of('/alert').to(join_code).emit('Alert_send', _sendData); // 키, 값                     
  }else{
    console.log('찾는 Alert data가 존재하지 않습니다.');
  }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const _checkLogin = (req, res, next) => {
  try {
    const order = req.user._id;
  if(order){
    User.findOne({ _id: order })
    .then((result) =>{
      if(result){
        const oppentEmail = result._code.oppentEmail;
        User.findOne({id:oppentEmail})
        .then((result) => {
          if(result){
            Tempcodes.deleteOne({userMail1:req.user.id})
            .then((results)=>{
              if(results.ok===1){
                console.log('커플 아이디가 존재합니다.');
                res.json({result:1});
              }else{
                console.log('커플 아이디가 존재하지 않습니다.');
                res.json({result:5});
              }
            }).catch((e)=>{
              console.error(e);
              next(e);
            })
          }else{
            console.log('커플 아이디가 존재하지 않습니다.');
            res.json({result:5});
          }
        }).catch((e)=>{
          console.error(e);
          next(e);
        }) 
      }
    }).catch((e) => {
      console.error(e);
      next(e);
    })
  }
  } catch (error) {
    console.error(error);
    next(error);
  }
  
}

const init_calendar = async (result) => {
  let check = null;
  check = result._code.codes;
  await Calendar.findOne({_code:check})
  .then(result=>{
    if(!result){
      const calendar = new Calendar({
        '_code': check,
        'sharedSchema':null,
        'wallpaperSchema': null
      });
        calendar.save((err)=>{
        if(err){
          return console.error(err);
        }else{
          return console.log('Calendar 생성');
        }
        })
    }else{
      return '존재합니다.';
    }
  })
}

const init_alert = async (result) => {
  let check = null;
  check = result._code.codes;
  await Alert.findOne({_code:check})
  .then(result=>{
    if(!result){
      const alert = new Alert({
        '_code': check,
        'dataSchema':[],
      });
      alert.save((err)=>{
        if(err){
          return console.error(err);
        }else{
          return console.log('Alert 생성');
        }
        })
    }else{
      return '존재합니다.';
    }
  })
}

 const init = async (result) => {
  let check = null;
  check = result._code.codes;
  return new Promise((resolve,reject)=>{
    resolve(Album.findOne({_code:check})
    .then(result=>{
      if(!result){
        const album = new Album({
          '_code': check,
          'dataSchema':null,
        });
          album.save((err)=>{
          if(err){
          console.error(err);
          }else{
          console.log('Albums 생성');
          }
          })
      }
    }));
    reject("에러발생");
  })  
}

const _main = (req,res,next) =>{
  try {
    const order = req.user._id;
    console.log(req.user);
    if(order){
      User.findOne({ _id: order })
      .then((result) =>{
        
        init(result).then((r) => {console.log("r:",r);
        init_alert(result).then((r) => {console.log("r:",r);
        init_calendar(result).then((r)=>{
          console.log("r:",r);
          let _img = null;
          let _oppentname = '';
          let _oppentEmail = '';
          let _name = null; 
          let _relDay = null;
          let _code = null;
          _oppentEmail =  result._code.oppentEmail;
          _code =  result._code.codes;
          console.log("codes:",_oppentEmail);
          _name = result.name;
          _relDay = result.relday;
          _relDay = _dateDiff(_relDay);
          Album.findOne({ '_code' : _code })
          .then((result)=>{
            if(result){
              _img = result.wallpaperSchema.src;
            }
            User.findOne({ 'id' : _oppentEmail })
            .then((r)=>{
              if(r){
                let check = '';
                let partnerRelday = '';
                if(r.relday!==req.user.relday){
                  check = 'DIF';
                  partnerRelday = req.user.relday
                }
                console.log('oppent찾기 성공:',r,_img);
                _oppentname = r.name;
                res.json({result:1,
                  check:check, 
                  user_info:{
                    name: _name,
                    relDay: _relDay,
                    img: _img,
                    oppentname:_oppentname,
                    partnerRelday:partnerRelday,
                  }
                });
              }else{
                console.log('oppent찾기 실패');
                res.json({result:0});
              }
            }).catch((err) => {
              console.log(err);
            });
          }).catch(()=>{
            User.findOne({ 'id' : _oppentEmail })
            .then((r)=>{
              if(r){
                let check = '';
                let partnerRelday = '';
                if(r.relday!==req.user.relday){
                  check = 'DIF';
                  partnerRelday = req.user.relday
                }
                console.log('oppent찾기 성공:',r,_img);
                _oppentname = r.name;
                res.json({result:1,
                  check:check, 
                  user_info:{
                    name: _name,
                    relDay: _relDay,
                    img: _img,
                    oppentname:_oppentname,
                    partnerRelday:partnerRelday,
                  }
                });
              }else{
                console.log('oppent찾기 실패');
                res.json({result:0});
              }
            }).catch((err) => {
              console.log(err);
            });
          })
         
        })
      })  
      }) 
      })
    }else{
      res.json({result:0});
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
    
  }


  const _getHome =(req,res,next) => {
    try {
      console.log(req.session);
    const _fMsg = req.flash();
    if(_fMsg){
      console.log(_fMsg.error);
      res.json({result:2, fMsg:_fMsg.error});
    }else{
      res.json({result:0});
    }
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }

  const _postHome =(req,res,next) => {
    try {
      console.log(req.session);
    const ORDER = "deleteSession"
    const order = req.body.order;
    if(ORDER === order){
      req.session.destroy(()=>{return req.session;}); 
      res.json({result:1});
    }else{
      res.json({result:0});
    }
    } catch (error) {
      console.error(error);
      next(error);
    }
    
  }

const updateRelday = async(req,res,next) => {
  try {
    console.log(req.body.data.order,'들어오나?');
    // if(req.body.order==="CHANGEMINE"){
    //   const query = {'id':req.user.id};
    //   await User.updateOne(query,{$set:{'relday':req.body.partnerRelday}});
    //   await _main(req,res,next);
    // }else if(req.body.order==="CHANGEPARTNERS"){
    //   const query = {'id':req.user._code.oppentEmail};
    //   await User.updateOne(query,{$set:{'relday':req.user.relday}});
    //   await _main(req,res,next);
    // }
  } catch (error) {
    console.error(error);
    next();
  }
}


const _setbackground =(req,res,next) => {
  try {
    console.log("req.file:", req.file);
    const file = req.file;
    if(file){
      const order = req.user._id;
      const shared_code = req.user._code.codes;
      const _filename = req.file.location;
      const _originalname = req.file.originalname;
      const _size = req.file.size;
      console.log(_filename,_originalname,_size);
      let _code = null;
      if(order){
        User.findOne({ _id: order })
        .then((result)=>{
          _code =  result._code.codes; 
          Album.findOne({ '_code' : _code })
          .then((result)=>{
            console.log("albumSkima유뮤존재",result);
              console.log('wallpaperSchema 값이 있음',result.wallpaperSchema);
              const query = {'_code':result._code};
              
              // Alert 업데이트 
              Alert.updateOne(query,{$addToSet:{'dataSchema':{number: 1, crud:1}}},(err,result)=>{
                    if(err) throw new Error();
                    else {
                      if(result.ok===1){
                        console.log("Alert_wallPaper 수정 완료");
                        _alertFindOne(shared_code,req,next);
                      }
                    }
                });

              // Wallpaper 업데이트 
              Album.updateOne(query,{$set:{wallpaperSchema: {size:_size, 
                                    originalname:_originalname, 
                                    src:_filename
                                  }}},(err,result)=>{
                if(err) throw new Error();
                else {
                  if(result.ok===1){
                Album.findOne({'_code':_code})
                .then((result)=>{
                  console.log('src',result.wallpaperSchema.src);
                  res.json({result:1, img:result.wallpaperSchema.src});
                })
              }
            }
          })
        .catch((err) => {
          console.log(err);
        });   
          })
        })
      }
    }else{
      res.json({result:0});
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
  
}

// const _fsRemove = (img) => {
//   const directory = path.join(process.cwd()+'/public/uploads/'); 
//   console.log("directory:",directory);
//   console.log("image:",img);
//   fs.readdir(directory, (err, files) => {
//     if (err) throw err;
//     for (const file of files) {
//       if(file===img)
//       fs.unlink(path.join(directory, file), err => {
//         if (err) throw err;
//         else console.log('FS_이미지 삭제 성공');
//       });
//     }
//   });
// }



module.exports = {
    mainMethod: _main, 
    getHome:_getHome,
    postHome:_postHome,
    setbackground:_setbackground,
    checkLogin:_checkLogin,
    updateRelday:updateRelday,
}