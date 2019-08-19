const Calendar = require('../../model/calendar');

const _readcalendar = (req,res) => {
  const {order, data} = req.query;
  console.log("_readcalendar",req.user._code,data);
  switch(order){
    case "READ":
      return _calendarRead(req.user._code,res);
    default:
      return;
  }
}

const _deletecalendar = (req,res) => {
  const {_id} = req.query;
  const shared_code = req.user._code.codes;
  console.log("_deletecalendar",_id);
  const query = {'_code':shared_code,"dataSchema":{ $elemMatch:{"_id":_id}}};
              Calendar.updateOne(query,{$pull:{dataSchema: {_id:_id 
                                  }}},(err,result)=>{
                if(err) throw new Error();
                else {
                if(result.ok===1){
                    _calendarRead(req.user._code,res);
                    console.log('캘린더 Delete완료');
              }else{
                res.json({result:5});
                    console.log('캘린더 Delete실패')
              }
            }
          })
}

const _setcalendar = (req,res) => {
  const shared_code = req.user._code.codes;
  console.log("_setcalendar",shared_code);
  _calendarHaveOrNot(shared_code,req,res); 
}

const _calendarHaveOrNot = async(shared_code,req,res) => {
  console.log("_calendarHaveOrNot",shared_code);
  await Calendar.findOne({ '_code' : shared_code })
  .then((r)=>{
    console.log("CalendarSkima유뮤존재",r);
    _calendarSkimaHaveOrNot(r,req,res);
  })
}

const _calendarSkimaHaveOrNot = async(r,req,res) => {
  console.log("_calendarSkimaHaveOrNot",r);
    if(r.dataSchema!==null){
    // 스키마자 존재 -> $addToset
    const author = req.user.name;
    console.log('스키마자 존재',req.body.data);
    const {startDate,endDate,startTime,endTime,sub,memo} = req.body.data;
    const query = {'_code':r._code};
      Calendar.updateOne(query,{$addToSet:{'dataSchema': 
            {'title':sub, 
            's_date':startDate,
            'e_date':endDate,
            's_time':startTime,
            'e_time':endTime,
            'author':author,
            'memo':memo,
          }}},{upsert:true, new: true},(err,result)=>{
        if(err) throw new Error();
        else {
          _calendarRead(req.user._code,res);
        }
        })
  }else{
    // 스키마가 null -> $set
    console.log('스키마자 존재하지 않음',req.body.data);
    const {author} = req.user.name;
    const {startDate,endDate,startTime,endTime,sub,memo} = req.body.data;
    const query = {'_code':r._code};
      Calendar.updateOne(query,{$set:{'dataSchema': 
            {'title':sub, 
            's_date':startDate,
            'e_date':endDate,
            's_time':startTime,
            'e_time':endTime,
            'author':author,
            'memo':memo,
          }}},{upsert:true, new: true},(err,result)=>{
        if(err) throw new Error();
        else {
          if(result.ok===1){
          _calendarRead(req.user._code,res);
          }
        }
        })
  }
}

const _calendarRead = ({codes},res) => {
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
    }
  

module.exports = {

  setcalendar:_setcalendar,
  readcalendar:_readcalendar,
  deletecalendar:_deletecalendar,
}