const Calendar = require('../../model/calendar');
const Alert = require('../../model/alert');
const User = require('../../model/user');

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

const _readcalendar = (req,res,next) => {
  try {
    const {order, data} = req.query;
  console.log("_readcalendar",req.user._code,data);
  switch(order){
    case "READ":
      return _calendarRead(req.user._code,res,next);
    default:
      return;
  }
  } catch (error) {
    console.error(error);
    next(error);
  }
  
}

const _deletecalendar = (req,res,next) => {
  try {
    const {_id} = req.query;
  const shared_code = req.user._code.codes;
  console.log("_deletecalendar",_id);
  
  const querys = {'_code':shared_code};

  // Alert 업데이트 
  Alert.updateOne(querys,{$addToSet:{'dataSchema':{number: 3, crud:3}}},(err,result)=>{
    if(err) throw new Error();
    else {
      if(result.ok===1){
        console.log("Alert_캘린더 삭제 코드 수정 완료");
        _alertFindOne(shared_code,req,next);
      }
    }
  });

  // 캘린더 data 삭제 
  const query = {'_code':shared_code,"dataSchema":{ $elemMatch:{"_id":_id}}};
              Calendar.updateOne(query,{$pull:{dataSchema: {_id:_id 
                                  }}},(err,result)=>{
                if(err) throw new Error();
                else {
                if(result.ok===1){
                    _calendarRead(req.user._code,res,next);
                    console.log('캘린더 Delete완료');
              }else{
                res.json({result:5});
                    console.log('캘린더 Delete실패')
              }
            }
          })
  } catch (error) {
    console.error(error);
    next(error);
  }
  
}

const _updatecalendar = async (req,res,next) => {
  try {
    const _id = req.body.data.id;
  let {startDate,endDate,startTime,endTime,sub,memo,category} = req.body.data;
  const author = req.user.name;
  const shared_code = req.user._code.codes;
  console.log("_updatecalendar",_id);
  const querys = {'_code':shared_code};
  const query = {'_code':shared_code,"dataSchema":{ $elemMatch:{"_id":_id}}};
  await Calendar.findOne({$and:[query]})
  .then((result)=>{
    if(result){
      console.log("_updatecalendar",result);
      try {

         // Alert 업데이트 
          Alert.updateOne(querys,{$addToSet:{'dataSchema':{number: 3, crud:2}}},(err,result)=>{
            if(err) throw new Error();
            else {
              if(result.ok===1){
                console.log("Alert_캘린더 수정 코드 수정 완료");
                _alertFindOne(shared_code,req,next);
              }
            }
          });

         // 캘린더 data 수정 
         Calendar.updateOne(query,{$set:{
                                      "dataSchema.$.title": sub!==null?sub:result.dataSchema.title,
                                      "dataSchema.$.s_date": startDate!==null?startDate:result.dataSchema.s_date, 
                                      "dataSchema.$.e_date": endDate!==null?endDate:result.dataSchema.e_date, 
                                      "dataSchema.$.s_time": startTime!==null?startTime:result.dataSchema.s_time,
                                      "dataSchema.$.e_time": endTime!==null?endTime:result.dataSchema.e_time, 
                                      "dataSchema.$.author": author,   
                                      "dataSchema.$.memo": memo!==null?memo:result.dataSchema.memo,
                                      "dataSchema.$.category": category!==null?category:result.dataSchema.category,
                                      }},(err,result)=>{
                    if(err) throw new Error();
                    else {
                    if(result.ok===1){
                        _calendarRead(req.user._code,res,next);
                        console.log('캘린더 Update완료');
                  }else{
                    res.json({result:5});
                        console.log('캘린더 Update실패')
                  }
                }
              })
      } catch (e) {
        console.error(e);
        next(e);
      }
    }else{
      res.send("데이터가 존재하지 않습니다.");
    }
  })   
  } catch (error) {
    console.error(error);
    next(error);
  }
          
}

const _setcalendar = (req,res,next) => {
  try {
    const shared_code = req.user._code.codes;
  console.log("_setcalendar",shared_code);
  _calendarHaveOrNot(shared_code,req,res,next); 
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const _calendarHaveOrNot = async(shared_code,req,res,next) => {
  try {
    console.log("_calendarHaveOrNot",shared_code);
  await Calendar.findOne({ '_code' : shared_code })
  .then((r)=>{
    console.log("CalendarSkima유뮤존재",r);
    _calendarSkimaHaveOrNot(r,req,res,next);
  })
  } catch (error) {
    console.error(error);
    next(error);
  }
  
}

const _calendarSkimaHaveOrNot = async(r,req,res,next) => {
  try {
    console.log("_calendarSkimaHaveOrNot",r);
    if(r.dataSchema!==null){
    // 스키마자 존재 -> $addToset
    const author = req.user.name;
    console.log('스키마자 존재',req.body.data);
    const {startDate,endDate,startTime,endTime,sub,memo,category} = req.body.data;
    const query = {'_code':r._code};

     // Alert 업데이트 
     Alert.updateOne(query,{$addToSet:{'dataSchema':{number: 3, crud:1}}},(err,result)=>{
      if(err) throw new Error();
      else {
        if(result.ok===1){
          console.log("Alert_캘린더 삽입 코드 수정 완료");
          _alertFindOne(r._code,req,next);
        }
      }
    });

    // 캘린더 data가 있을 때 수정 
    Calendar.updateOne(query,{$addToSet:{'dataSchema': 
            {'title':sub, 
            's_date':startDate,
            'e_date':endDate,
            's_time':startTime,
            'e_time':endTime,
            'author':author,
            'memo':memo,
            'category':parseInt(category),
          }}},{upsert:true, new: true},(err,result)=>{
        if(err) throw new Error();
        else {
          _calendarRead(req.user._code,res,next);
        }
        })
  }else{
    // 스키마가 null -> $set
    console.log('스키마자 존재하지 않음',req.body.data);
    const {author} = req.user.name;
    const {startDate,endDate,startTime,endTime,sub,memo,category} = req.body.data;
    const query = {'_code':r._code};

    // Alert 업데이트 
    Alert.updateOne(query,{$addToSet:{'dataSchema':{number: 3, crud:1}}},(err,result)=>{
      if(err) throw new Error();
      else {
        if(result.ok===1){
          console.log("Alert_캘린더 삽입 코드 수정 완료");
          _alertFindOne(r._code,req,next);
        }
      }
    });

    // 캘린더 data가 없을 때 수정 
    Calendar.updateOne(query,{$set:{'dataSchema': 
            {'title':sub, 
            's_date':startDate,
            'e_date':endDate,
            's_time':startTime,
            'e_time':endTime,
            'author':author,
            'memo':memo,
            'category':parseInt(category),
          }}},{upsert:true, new: true},(err,result)=>{
        if(err) throw new Error();
        else {
          if(result.ok===1){
          _calendarRead(req.user._code,res,next);
          }
        }
        })
  }
  } catch (error) {
    console.error(error);
    next(error);
  }
  
}

const _calendarRead = ({codes},res,next) => {
  try {
    console.log('_calendarRead',codes);
    Calendar.findOne({'_code':codes})
      .then((result)=>{
      if(result){
      console.log('캘린더Read 완료',result.dataSchema);
      const _result = result.dataSchema;
      res.json({results:1, 
                data:_result});
      }else{
        console.log('캘린더Read 실패'); 
        res.json({results:5});
       }
      })
    .catch((err) => {
      console.log(err);
      });  
  } catch (error) {
    console.error(error);
    next(error);
  }
}
  

module.exports = {

  setcalendar:_setcalendar,
  readcalendar:_readcalendar,
  deletecalendar:_deletecalendar,
  updatecalendar:_updatecalendar,
}