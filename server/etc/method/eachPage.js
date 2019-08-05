const datediff = require('../../../src/lib/moment').datediff;
const User = require('../../model/user');
const dateCal = require('../../../src/lib/moment').dateCal;

const _main = (req,res) =>{
    const order = req.user._id;
    if(order){
      User.findOne({ _id: order })
      .then((result) =>{
        const _img = result.image.src;
        const _name = result.name;
        let _relDay = result.relday;
        _relDay = datediff(_relDay);
        res.json({result:1, 
                  user_info:{
                    name: _name,
                    relDay: _relDay,
                    img: _img
                  }
                });
      })
    }else{
      res.json({result:0});
    }
  }

  const _menorial = (req,res) => {
    const order = req.user._id;
    if(order){
      User.findOne({ _id: order })
      .then((result) =>{
        let _calDay = null;
        const _birth = result.birth;
        const _name = result.name;
        let _relDay = result.relday;
        _relDay = datediff(_relDay);
        _calDay = dateCal(_relDay);
        res.json({result:1, 
                  user_info:{
                    name: _name,
                    relDay: _relDay,
                    calDay: {first:_calDay[0],
                            second:_calDay[1],
                            third:_calDay[2],
                            forth:_calDay[3]
                            },
                    birth: _birth
                  }
                });
      })
    }else{
      res.json({result:0});
    }
  }  

module.exports = {
    mainMethod: _main,
    menorialMethod : _menorial
}