const User = require('../../model/user');
const Alert = require('../../model/alert');

const _alertFindOne = async(req, res, next) => {
  try {
    const shared_code = req.user._code.codes;
    const order = req.user._id;
    const oppentEmail = req.user._code.oppentEmail;
    const alertData = await Alert.findOne({"_code":parseInt(shared_code)}); 
      if(alertData){
        const userData = await User.findOne({'_id':order});
        const oppentData = await User.findOne({'id':oppentEmail});
        const _sendData = await alertData.dataSchema.map((data)=>{return({
                                              _code:alertData._code,
                                              number:data.number,
                                              crud:data.crud,
                                              name:userData.name,
                                              oppentName:oppentData.name,
                                              cratedAt:data.cratedAt,
                                              }
                                            )}).reverse();
                       
       res.json({results:1, sendData:_sendData});
       console.log('찾는 Alert data 전송 완료.');
      }else{
        res.json({results:5});
        console.log('찾는 Alert data 가 존재하지 않습니다.');
      }
  } catch (error) {
    console.error(error);
    next();
  }
  
}

module.exports = {
    alertInfo: _alertFindOne,
}