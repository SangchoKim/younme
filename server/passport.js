const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Users = require('./model/user');

module.exports = () => {
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    console.log('serializeUser:',user);  
    done(null, user._id); // 여기의 user._id가 req.session.passport.user에 저장
  });

 passport.deserializeUser((id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
  console.log('deserializeUser:',id); // 페이지에 들어갈떄마다 호출 되는 함수
  Users.findById(id, (err, user) => {
    done(null, user); // 여기의 user가 req.user가 됨 
  });
});

  passport.use(new LocalStrategy({ // local 전략을 세움
    usernameField: 'email',
    passwordField: 'password',
    session: true, // 세션에 저장 여부
    passReqToCallback: false
  }, (username, password, done) => {
    console.log("LocalStrategy:", username,password);
    Users.findOne({ id: username }, (findError, user) => {
      if (findError) return done(findError); // 서버 에러 처리
      if (!user) return done(null, false, { message: '존재하지 않는 아이디입니다' }); // 임의 에러 처리
      return user.comparePassword(password,user._salt, (passError, isMatch) => {
        if (isMatch) {
          return done(null, user); // 검증 성공
        }else
        return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리
      });
    });
  }));

  passport.use(new FacebookStrategy({
    clientID: '372621646779170',
    clientSecret: '48fb2ddd76c8dfa7fa4a51502bcdf680',
    callbackURL: '홈페이지주소/auth/facebook/callback',
    passReqToCallback: true,
  }, (req, accessToken, refreshToken, profile, done) => {
    Users.findOne({ id: profile.id }, (err, user) => {
      if (user) {
        return done(err, user);
      } // 회원 정보가 있으면 로그인
      const newUser = new Users({ // 없으면 회원 생성
        id: profile.id
      });
      newUser.save((user) => {
        return done(null, user); // 새로운 회원 생성 후 로그인
      });
    });
  }));
};



