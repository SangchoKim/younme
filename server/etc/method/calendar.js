const Calendar = require('../../model/calendar');

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
          _calendarRead(result,req.user._code,res);
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
          _calendarRead(result,req.user._code,res);
        }
        })
  }
}

const _calendarRead = (result,{codes},res) => {
  if(result.ok===1){
    Calendar.findOne({'_code':codes})
      .then((result)=>{
      if(result){
      console.log('캘린더Read 완료',result.dataSchema);
      res.json({result:1, 
                data:result.dataSchema});
      }else{
        console.log('캘린더Read 실패'); 
        res.json({result:5});
       }
      })
    .catch((err) => {
      console.log(err);
      });  
    }
}

module.exports = {

  setcalendar:_setcalendar,
}