import React,{Component} from 'react';
import Titile from '../components/Titile'
import Pmain from '../components/P_img'
import { connect } from 'react-redux';
import * as MypageAction from '../store/modules/Mypage';


let _email = '';
let _name = '';
let _birthday = '';
let _gender = '';
class Mypage extends Component{
  constructor(props){
    super(props);
    this.state = {
      modalHeder:{title1:'상태 메시지',title2:'생일',title3:'성별'},
      modalBody:{comment1:'상태메시지를 입력해주세요',comment2:'상태메시지를 입력해주세요!' },
      modalFooter:{confirm:'확인'},
      user_info:{email:this.props.location.state.email
                ,name:this.props.location.state.name
                ,birthday:this.props.location.state.birthday
                ,gender:this.props.location.state.gender},
      modes:'stateMessage'   
    };
  }

  componentWillMount = () => {
    console.log("props.location:",this.props.location);
    if(this.props.location.state){
      _email = this.props.location.state.email;
      _name = this.props.location.state.name;
      _birthday = this.props.location.state.birthday;
      _gender = this.props.location.state.gender;
      console.log("email:", _email);
      console.log("name:",_name);
      console.log("birthday:",_birthday);
      console.log("gender:",_gender);
    }
  }


  render(){

    let _title , _comment = null;
    if(this.props.modes ==='stateMessage'){
      _title = this.props.title1;
      _comment = this.props.comment1;
    } else if(this.props.modes ==='birthday'){
      _title = this.props.title2;
    } else if(this.props.modes==='gender'){
      _title = this.props.title3;
    }

    return(
      <React.Fragment>  
        <Titile 
          title={this.props.title}
          back={this.props.back}
          update={this.props.update}
          backUrl={this.props.backUrl}
          updateUrl={this.props.updateUrl}
          mainIcon={this.props.mainIcon}
          rightIcon={this.props.rightIcon}
          backIcon={this.props.backIcon}
          mode={this.props.mode}
        />
        <Pmain
          history={this.props.history}
          location={this.props.location}
          title={_title}
          comment = {_comment}
          confirm = {this.props.confirm}
          onChangePage={function(word){
            console.log(word);
            if(word === 'stateMessage')
            this.props.stateMessage();
            else if(word === 'gender')
            this.props.gender();
            else if(word === 'birthday')
            this.props.birthday();
          }.bind(this)}
          email = {this.state.user_info.email}
          name = {this.state.user_info.name}
          gender = {this.state.user_info.gender}
          birthday = {this.state.user_info.birthday}
        />
      </React.Fragment>
    )
  }
}
    
// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
  
  title: state.Mypage.Title.title,
  back: state.Mypage.Title.back,
  update: state.Mypage.Title.update,  
  backUrl: state.Mypage.Title.backUrl,
  updateUrl: state.Mypage.Title.updateUrl,
  mainIcon: state.Mypage.Title.icon.main,
  rightIcon: state.Mypage.Title.icon.update,
  backIcon: state.Mypage.Title.icon.back,
  caretDown: state.Mypage.Title.icon.caretDown,
  mode: state.Mypage.Title.mode.show,
  title1: state.Mypage.modalHeder.title1,
  title2: state.Mypage.modalHeder.title2,
  title3: state.Mypage.modalHeder.title3,
  comment1: state.Mypage.modalBody.comment1,
  confirm: state.Mypage.modalFooter.confirm,
  modes: state.Mypage.mode,
  email: state.Mypage.user_info.email,
  name: state.Mypage.user_info.name,
  birthday:state.Mypage.user_info.birthday,
  gender:state.Mypage.user_info.gender
  
});


// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({
  stateMessage: () => dispatch(MypageAction.popUpstateMessage(_email,_name,_birthday,_gender)),
  gender: () => dispatch(MypageAction.popUpGender(_email,_name,_birthday,_gender)),
  birthday: () => dispatch(MypageAction.popUpBirthday(_email,_name,_birthday,_gender))
})

    
export default connect(mapStateToProps, mapDispatchToProps) (Mypage);



