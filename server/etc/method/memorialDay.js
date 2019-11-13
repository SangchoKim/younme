const {_dateCal,_dateDiff,cal} = require('../../../src/lib/moment');
const User = require('../../model/user');


  const _menorial = (req,res,next) => {
    try {
      const order = req.user._id;
    if(order){
      User.findOne({ _id: order })
      .then((result) =>{
        let _calDay = null;
        let _oppentname = '';
        let _oppenetbirthday = '';
        const _birth = result.birth;
        const _name = result.name;
        let _relDay = result.relday;
        _relDay = _dateDiff(_relDay);
        _calDay = cal(_relDay);
        console.log("codes:",result._code.oppentEmail);
        User.findOne({ 'id' : result._code.oppentEmail })
        .then((r)=>{
          if(r){
            console.log('oppent찾기 성공:',r);
            _oppentname = r.name;
            _oppenetbirthday = r.birth;
            res.json({result:1, 
              user_info:{
                name: _name,
                relDay: _relDay,
                calDay: {first:_calDay,
                        },
                birth: _birth,
                oppenetbirthday: _oppenetbirthday,
                oppentname:_oppentname
              }
            });
          }else{
            console.log('oppent찾기 실패');
            res.json({result:0});
          }
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

module.exports = {
    menorialMethod : _menorial,
}