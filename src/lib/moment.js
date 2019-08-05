const moment = require('moment');

const _dateDiff = (_relDay) =>{
    let _startRelDay = moment(_relDay,'YYYY-MM-DD');
    let _today = moment();
    console.log('startRelDay:',_startRelDay);
    console.log('today:',_today);
    const day_diff = _today.diff(_startRelDay,'days')
    console.log("day_diff:",day_diff);
  
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
    console.log("result",result);            
    return result;
}

module.exports = {
    datediff:_dateDiff,
    dateCal:_dateCal
}