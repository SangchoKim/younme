import React,{PureComponent} from 'react';
import Titile from '../components/Titile'
import Pmain from '../components/P_img'
import Loding from '../components/Loding';
import { connect } from 'react-redux';
import * as MypageAction from '../store/modules/Mypage';


class Mypage extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      modalHeder:{title1:'상태 메시지',title2:'생일',title3:'성별'},
      modalBody:{comment1:'상태메시지를 입력해주세요',comment2:'상태메시지를 입력해주세요!' },
      modalFooter:{confirm:'확인'},
      modes:'stateMessage'   
    };
  }

  componentWillUnmount(){
    const {mypageout} = this.props;
    mypageout();
  }

  componentDidMount = () => {
    const {mypageRequest} = this.props;
    // 리덕스 사가 호출
    mypageRequest();
  }

  _onChangePage = (word) => {
    if(word === 'stateMessage')
    this.props.stateMessage();
    else if(word === 'gender')
    this.props.gender();
    else if(word === 'birthday')
    this.props.birthday();
  }

  render(){
    const {mypageState} = this.props;
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
        {mypageState==="isReady"&&
           <Loding />
        }
        {mypageState==="isFail"&&
           <p>에러발생</p>
        }
        {mypageState==="isSuccess"&&
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
          onChangePage={this._onChangePage}
          email = {this.props.email}
          name = {this.props.name}
          gender = {this.props.genders}
          oppentEmail = {this.props.oppentEmail}
          intro = {this.props.intros}
          birthday = {this.props.birthdays}
        />
         </React.Fragment>
        }  
      </React.Fragment>
    )
  }
}
    
// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
  mypageState: state.Mypage.mypageState,
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
  birthdays:state.Mypage.user_info.birthday,
  genders:state.Mypage.user_info.gender,
  intros:state.Mypage.user_info.intro,
  oppentEmail:state.Mypage.user_info.oppentEmail
});


// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({
  mypageout: () => dispatch(MypageAction.mypageout()),
  mypageRequest: () => dispatch(MypageAction.mypageRequest()),
  stateMessage: () => dispatch(MypageAction.popUpstateMessage()),
  gender: () => dispatch(MypageAction.popUpGender()),
  birthday: () => dispatch(MypageAction.popUpBirthday())
})

    
export default connect(mapStateToProps, mapDispatchToProps) (Mypage);



