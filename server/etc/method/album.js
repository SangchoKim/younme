const User = require('../../model/user');
const Album = require('../../model/album');


const _albumRead = (req,res) =>{
    const order = req.user._id;
    if(order){
      User.findOne({ _id: order })
      .then((result) =>{
        let _img = null;
        let _code = null;
        _code =  result._code.codes;
        console.log("codes:",_code);
        Album.find({ '_code' : _code })
        .then((result)=>{
          if(result){
            console.log('공유앨범Read 완료',result[0].sharedSchema);
            _img = result[0].sharedSchema;
            res.json({result:1,img:_img});
          }else{
            console.log('공유앨범Read 실패'); 
            res.json({result:5});
          }
        })
        .catch((err) => {
            console.log(err);
          });  
      })
    }else{
    console.log('세션 _id 값 없음');
      res.json({result:0});
    }
  }

  
module.exports = {
    albumRead: _albumRead
}