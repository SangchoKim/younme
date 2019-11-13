const moment = require('moment');

const _dateDiff = (_relDay) =>{
    let _startRelDay = moment(_relDay,'YYYY-MM-DD');
    let _today = moment();
    const day_diff = _today.diff(_startRelDay,'days')
  
    return day_diff;
}

const _dateCal = (_relDay) =>{

    const val = [1200,1300,1400,1460];
    let result = null;
    for(let key in val){
    if(val[key]>=Number(_relDay))
        result = val.map((val) => val - Number(_relDay));
    else
        result = val.map((val) => Number(_relDay) - val);
    }           
    return result;
}

const cal = (relDay) => {
    // return new Promise((resolve, reject) => {
      let num = 500;
      while (true) {
        if(num>=relDay){
          return num;
        //   break;
        }
        if(num<=relDay){
          num = num + 500;
        }
      }
    // });
  }

const _timeArrange = (time) =>{
   return moment(time).format('h:mm a');
}

const _dataArrange = (startDate,endDate) =>{
    const _startDate = moment(startDate).format('YYYY-MM-DD');
    const _endDate = moment(endDate).format('YYYY-MM-DD');
    const result = {startDate:_startDate,endDate:_endDate }
    return result
}
module.exports = {
    _dateDiff,
    _dateCal,
    timeArrange:_timeArrange,
    dataArrange:_dataArrange,
    cal,
}