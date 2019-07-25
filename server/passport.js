const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./model/user');

module.exports = () => {
    passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
        done(null, user._id); // 여기의 user._id가 req.session.passport.user에 저장
    });

 passport.deserializeUser((id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
  User.findById(id, (err, user) => {
    done(null, user); // 여기의 user가 req.user가 됨 
  });
});
  

  passport.use(new LocalStrategy({ // local 전략을 세움
    usernameField: 'id',
    passwordField: 'pw',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
  }, (id, password, done) => {
    Users.findOne({ id: id }, (findError, user) => {
      if (findError) return done(findError); // 서버 에러 처리
      if (!user) return done(null, false, { message: '존재하지 않는 아이디입니다' }); // 임의 에러 처리
      return user.comparePassword(password, (passError, isMatch) => {
        if (isMatch) {
          return done(null, user); // 검증 성공
        }
        return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리
      });
    });
  }));
};



