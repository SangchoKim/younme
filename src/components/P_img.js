import React, { PureComponent } from 'react';
import {MDBContainer ,MDBRow,MDBCol,MDBBtn, MDBCard,MDBIcon, MDBInput,MDBListGroup, MDBListGroupItem, MDBModal, MDBModalHeader,MDBModalBody,MDBModalFooter } from 'mdbreact';
import defaultImg from '../img/P_default.jpg'
import mypageName from '../img/mypage_name.png'
import mypageState from '../img/mypage_state.png'
import mypageEmpty from '../img/mypage_empty.png'
import mypageMyaccount from '../img/mypage_myaccount.png'
import mypageOppnentaccount from '../img/mypage_oppnentaccount.png'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
import { connect } from 'react-redux';
import * as MypageAction from '../store/modules/Mypage';


const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    fontFamily:"a다정다감"
  }


 const imgLayout1 = {
  postion:'absolute',
  top:-1250,
  left:10,
  borderRadius:"100%"
 }

 const imgLayout2 = {
  postion:'absolute',
  top:-1165,
  left:320,
  borderRadius:"100%"
 }

 const imgLayout3 = {
  padding:"0",
  height:'auto',
  width:'20%',
  borderRadius:"10%"
 }

 const list1 = {
  display: 'flex',
  flexDirection: "row",
  justifyContent: 'space-between',
  alignItems:'center'
 }

class P_img extends PureComponent{

    state = {
      selectedDay: undefined,
      ex: '',
      birthday:'',
      modal: false,
      mode: '',
      user_info:{email:''
                ,name:''
                ,birthday:''
                ,gender:''
                ,intro:''
                ,oppentEmail:''
            },
    };

  handleDayClick = (day) => {
    this.setState({ selectedDay: day });
    let _day = moment(day);
    const days =_day.format('YYYY-MM-DD');
    this.setState(prevState => ({
        user_info: {
            ...prevState.user_info,
            birthday : days
        }
    }));
    }
  
  toggle = (e) => {
    let _mode = e.target.id;
    this.props.onChangePage(_mode);
    this.setState({
      modal: !this.state.modal,
      mode: _mode
    });
  }

  _onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      user_info: {
          ...prevState.user_info,
          [name] : value
       }
     }));
  }

  onChangeGender = (e) => {
    e.preventDefault();
    const _gender = e.target.name;
    const {mypageGenderRequest} = this.props;
    mypageGenderRequest(_gender);
    this.setState({modal:!this.state.modal});
  }

  onChangeinfo = (e) => {
    e.preventDefault();
    const ex = this.state.user_info.intro;
    const {mypageIntroRequest} = this.props;
    mypageIntroRequest(ex);
    this.setState({modal:!this.state.modal});
  }

  onChangebirth = (e) => {
    e.preventDefault();
    const birthday = this.state.user_info.birthday;
    const {mypageBirtdayRequest} = this.props;
    mypageBirtdayRequest(birthday);
    this.setState({modal:!this.state.modal});
  }

  logout = (e) => {
    e.preventDefault();
    const url = '/';
    e.preventDefault();
      window.confirm('정말로 로그아웃 하시겠습니까?')&&
      fetch("/api/logout",{method: "get",
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          })
      .then(res => res.json())
      .then((res) =>{
        if(res.result===1){
        this.props.history.push({
              pathname: url,
        });
        }else{
          console.error(res.error);
        }
       })
  }

  render() {
    let _modes = null;
    if (this.state.mode === 'stateMessage') {
        _modes = <React.Fragment >
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                <form onSubmit={this.onChangeinfo}>
                    <MDBModalHeader style={font} toggle={this.toggle}>{this.props.title}</MDBModalHeader>
                    <MDBModalBody style={font}>
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBInput
                                    name="intro"
                                    label="상태 메시지를 입력 해주세요"
                                    type="textarea"
                                    validate="validate"
                                    error="wrong"
                                    success="right"
                                    maxLength="200"
                                    value={this.state.user_info.intro}
                                    onChange={this._onChange}/>
                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>닫기</MDBBtn>
                        <MDBBtn type="submit" color="primary">{this.props.confirm}</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
        </React.Fragment>
    } else if (this.state.mode === 'gender') {
        _modes = <React.Fragment >
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                <MDBModalHeader toggle={this.toggle} style={font}>{this.props.title}</MDBModalHeader>
                <MDBModalBody style={font}>
                    <MDBRow>
                        <MDBCol md="12">
                            <form>
                                <div>
                                    <MDBBtn
                                        onClick={this.onChangeGender}
                                        name="남성"
                                        outline="outline"
                                        color="info"
                                        style={{
                                            width: "100%"
                                        }}>남성</MDBBtn>
                                </div>
                                <div>
                                    <MDBBtn
                                        onClick={this.onChangeGender}
                                        name="여성"
                                        outline="outline"
                                        color="info"
                                        style={{
                                            width: "100%"
                                        }}>여성</MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>닫기</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </React.Fragment>
    } else if (this.state.mode === 'birthday') {
        _modes = <React.Fragment >
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                <form onSubmit={this.onChangebirth}>
                    <MDBModalHeader toggle={this.toggle} style={font}>{this.props.title}</MDBModalHeader>
                    <MDBModalBody style={font}>
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="blackt text-center">
                                    <DayPicker onDayClick={this.handleDayClick}/> {
                                        this.state.selectedDay
                                            ? (
                                                <p className="yellow" name="birthday">{
                                                        this
                                                            .state
                                                            .selectedDay
                                                            .toLocaleDateString()
                                                    }</p>
                                            )
                                            : (<p>Please select a day.</p>)
                                    }
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>닫기</MDBBtn>
                        <MDBBtn type="submit" color="primary">{this.props.confirm}</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
        </React.Fragment>
    }
    return (
        <React.Fragment >
            <MDBContainer>
                <MDBRow style={font}>
                    <MDBCol md="2"></MDBCol>
                    <MDBCol md="8">
                        <MDBCard className="mt-2">
                            <div>
                                <img
                                    src="https://cdn.pixabay.com/photo/2018/04/28/22/03/dawn-3358468_1280.jpg"
                                    alt="img"
                                    width="100%"
                                    height="auto"></img>
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    top: 300,
                                    textAlign: 'center',
                                    width: '100%'
                                }}>
                                <img style={imgLayout3} src={defaultImg} alt="img"></img>
                            </div>
                            <div>
                                <img src={mypageName} alt="img" width="100%" height="auto"></img>
                            </div>
                            <div className="pl-4 p-3">
                                <h5 className="m-0">{this.props.name}</h5>
                            </div>
                            <div>
                                <img src={mypageState} alt="img" width="100%" height="auto"></img>
                            </div>
                            <div className="p-2">
                                <button className="btn-link btn-white" onClick={this.toggle}>
                                    <div className="ml-2" id='stateMessage'>{this.props.intro}</div>
                                </button>
                            </div>
                            <div>
                                <img src={mypageEmpty} alt="img" width="100%" height="auto"></img>
                            </div>
                            <div>
                                <MDBListGroup>
                                    <MDBListGroupItem style={list1}>
                                        <div className="ml-2"><MDBIcon icon="birthday-cake fa-2x" className="mr-2"/>생일</div>
                                        <button className="btn-link btn-white" onClick={this.toggle}>
                                            <div className="ml-2" id='birthday'>{this.props.birthday}</div>
                                        </button>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem style={list1}>
                                        <div className="ml-2"><MDBIcon icon="mars fa-2x" className="mr-2"/>성별</div>
                                        <button className="btn-link btn-white" onClick={this.toggle}>
                                            <div className="ml-2" id='gender'>{this.props.gender}</div>
                                        </button>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </div>
                            <div>
                                <img src={mypageMyaccount} alt="img" width="100%" height="auto"></img>
                            </div>
                            <div>
                                <div className="pl-4 p-3">
                                    <h5 className="m-0">{this.props.email}</h5>
                                </div>
                            </div>
                            <div>
                                <img src={mypageOppnentaccount} alt="img" width="100%" height="auto"></img>
                            </div>
                            <div className="pl-4 p-3">
                                <h5 className="m-0">{this.props.oppentEmail}</h5>
                            </div>
                            <div>
                                <img src={mypageEmpty} alt="img" width="100%" height="auto"></img>
                            </div>
                            <div>
                                <MDBListGroup>
                                    <MDBListGroupItem>
                                        <button className="btn-link btn-white" onClick={this.logout}>
                                            <div className="ml-2">로그아웃</div>
                                        </button>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem >
                                        <div className="ml-2">비밀번호 변경하기</div>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </div>
                            <div>
                                <img src={mypageEmpty} alt="img" width="100%" height="auto"></img>
                            </div>
                            <div className="pl-4 p-3">
                                <h5 className="m-0">상대방과 연결 끊기</h5>
                            </div>
                            <div>
                                <img src={mypageEmpty} alt="img" width="100%" height="auto"></img>
                            </div>
                        </MDBCard>
                        <MDBBtn style={imgLayout1} outline="outline" color="danger" size="sm"><MDBIcon icon="camera"/></MDBBtn>
                        <MDBBtn style={imgLayout2} outline="outline" color="danger" size="sm"><MDBIcon icon="camera"/></MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBContainer>
                {_modes}
            </MDBContainer>
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
    mypageIntroRequest: (ex) => dispatch(MypageAction.mypageIntroRequest(ex)),
    mypageBirtdayRequest: (day) => dispatch(MypageAction.mypageBirtdayRequest(day)),
    mypageGenderRequest: (gender) => dispatch(MypageAction.mypageGenderRequest(gender)),
  })

export default  connect(mapStateToProps, mapDispatchToProps) (P_img);  