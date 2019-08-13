const dateCal = require('../../../src/lib/moment').dateCal;
const datediff = require('../../../src/lib/moment').datediff;
const User = require('../../model/user');


  const _menorial = (req,res) => {
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
        _relDay = datediff(_relDay);
        _calDay = dateCal(_relDay);
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
                calDay: {first:_calDay[0],
                        second:_calDay[1],
                        third:_calDay[2],
                        forth:_calDay[3]
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
  }  

module.exports = {
    menorialMethod : _menorial,
}