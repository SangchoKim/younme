import React, { Component } from 'react';
import {MDBNavbar,MDBContainer,MDBNavbarToggler,MDBCollapse, MDBNavbarNav, MDBNavItem, MDBIcon,
  MDBBtn,MDBModal,MDBModalBody,MDBCard,MDBModalHeader,MDBRow,MDBCol,MDBInput,MDBModalFooter,MDBListGroupItem,MDBListGroup } from 'mdbreact';
import { Link  } from'react-router-dom';
import Switch from "react-switch";
import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimeInput from 'material-ui-time-picker';
import Webcam from "react-webcam";


const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:25,
    fontFamily:"a다정다감",
    // width:100%
  }

const layout ={
  disPlay: "flex",
  flexDirection: "row",
  justifyContent: "center",
  color:"white",
  fontSize:"15px",
  alignItems :"center"
}

const modal ={

  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: "row",
  alignItems :"center",
  justifyContent: 'space-around',
  padding:'1em'
}

const list1 = {
  display: 'flex',
  flexDirection: "row",
  justifyContent: 'space-between',
  alignItems:'center'
 }

class M_nav extends Component{

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      checked: false,
    };
    this.onClick = this.onClick.bind(this);
    this.handleChanged = this.handleChanged.bind(this);
    
  }

  state = {
    modal6: false,
    modal7: false,
    modal: false,
    switch1: true,
    switch2: false

  };
  
  t = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  handleChanged(checked) {
    this.setState({ checked });
  }

  render(){
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return(
      <React.Fragment>  
       <MDBNavbar dark expand="md" style={font} >
                <MDBContainer>
                    <div>
                      <strong>You&Me</strong>
                    </div>      
                  <MDBNavbarToggler onClick={this.toggleCollapse} />
                  <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav style={layout} className="text-center">
                      <MDBNavItem>
                        <Link to={this.props.backUrl}><MDBIcon icon={this.props.backIcon} /><br></br>{this.props.back}</Link>
                      </MDBNavItem>
                      <MDBNavItem >
                        <Link to="#"><MDBIcon icon={this.props.mainIcon} /><br></br>{this.props.title}</Link>
                      </MDBNavItem>
                      {this.props.mode==="album"?
                       <MDBNavItem >
                       <MDBBtn outline color="blue" onClick={this.props.toggle(8)}><MDBIcon icon={this.props.rightIcon} /></MDBBtn>
                     </MDBNavItem>
                      :
                      this.props.mode==="calendar"?
                      <MDBNavItem >
                        <MDBBtn outline color="blue" onClick={this.t}><MDBIcon icon={this.props.rightIcon} /></MDBBtn>
                      </MDBNavItem>
                      :
                      <MDBNavItem >
                      <Link to="#"><MDBIcon icon={this.props.rightIcon} /><br></br>{this.props.update}</Link>
                    </MDBNavItem>
                      }                 
                    </MDBNavbarNav>
                  </MDBCollapse>
                  
                  {this.props.mode==="album"&&
                     <div>  
                     <MDBModal isOpen={this.props.modal8} toggle={this.props.toggle(8)} fullHeight position="top">            
                     <form onSubmit={this.props.setData}>
                     <MDBModalBody>
                     {!this.props.show &&
                       <MDBCard style={modal} className="text-center">
                         <MDBBtn color="blue" name="camera" onClick={this.props.onClick}><MDBIcon icon="camera fa-2x" /> 카메라</MDBBtn>
                         <MDBBtn color="blue" name="album" onClick={this.props.onClick}><MDBIcon far icon="images fa-2x" /> 사진</MDBBtn>
                         <MDBBtn color="blue" name="video" ><MDBIcon icon="video fa-2x" /> 동영상</MDBBtn>
                         <MDBBtn color="blue" name="memo"><MDBIcon icon="sticky-note fa-2x" /> 메모</MDBBtn>
                       </MDBCard>
                       }
                      {(this.props.show && this.props.setting==='album') && 
                     <div>
                     <MDBRow>
                      <MDBCol md="4" >
                      </MDBCol> 
                      <MDBCol md="4">
                        <div className="custom-file">
                          <input
                            name="myImage"
                            onChange = {this.props.onChangePhoto}
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            />
                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                          Choose file
                        </label>
                        </div>
                        </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="4" >
                          </MDBCol> 
                          <MDBCol md="4">
                          <div className="text-center mt-3"  >
                            <MDBCard >
                            <img src={this.props.file} alt='' width="500" height="auto"></img>
                            </MDBCard>
                          </div>
                          </MDBCol>
                          </MDBRow>
                          </div>
                       }
                       {(this.props.show && this.props.setting==='camera') && !this.props.imageData 
                          &&
                        <div>
                         <MDBRow>
                           <MDBCol md="2" >
                             </MDBCol> 
                               <MDBCol md="8">
                                 <MDBCard>
                                    <div className="text-center">                        
                                    <Webcam 
                                       height={600}
                                       width={600}
                                       style={{textAlign:"center"}}
                                       ref={this.props.setRef}
                                       screenshotFormat="image/jpeg"
                                       videoConstraints={videoConstraints}
                                       />
                                      </div>
                                    </MDBCard>
                                        <div className="black-text">                                                                       
                                        <MDBInput
                                          label="이미지의 이름을 입력해주세요"
                                          name="myImage"
                                          value={this.props.imageName}
                                          onChange = {this.props.onChangeCamera}
                                          type="text"
                                          /> 
                                          </div>                                          
                                         </MDBCol>
                                     </MDBRow>
                                  </div>}
                      {this.props.imageData && this.props.show && this.props.setting==='camera' &&
                        <div>
                        <MDBRow>
                         <MDBCol md="4" >
                          </MDBCol> 
                           <MDBCol md="4">
                           <div className="text-center">     
                            <MDBCard className="text-center mt-3" >
                             <img src={this.props.imageData} alt='' width="500" height="auto"></img>
                              </MDBCard>
                              </div>
                               <div className="text-center mt-3">                                                                        
                                <h4>이미지 이름: {this.props.imageName}</h4>                                                                                                                      
                              </div>
                                </MDBCol>
                              </MDBRow>
                             </div>}                      
                     </MDBModalBody>
                     <MDBModalFooter>
                        {this.props.show && this.props.setting==='album' &&
                          <div>
                            <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                            <MDBBtn type="submit" name="submit" color="info" >변경</MDBBtn>
                          </div>
                        }
                        {this.props.show && this.props.setting==='camera' && !this.props.imageData &&
                          <div>
                            <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                            <MDBBtn name="capture" color="info" onClick={this.props.capture} >촬영</MDBBtn> 
                          </div>
                        }
                        {this.props.imageData && this.props.show && this.props.setting==='camera' &&
                            <div>
                              <MDBBtn type="submit" name="save" color="success">저장</MDBBtn>
                              <MDBBtn name="retake" color="warning" onClick={this.props.onClickRetake} >재촬영</MDBBtn>
                            </div>
                        }
                        <MDBBtn color="secondary" onClick={this.props.toggle(8)}>닫기</MDBBtn>
                      </MDBModalFooter>
                      </form>
                   </MDBModal>
                 </div>    
                  }
                  {this.props.mode==="talk" &&
                      <div>                      
                        <MDBBtn outline color="light-blue" onClick={this.toggle(8)}><MDBIcon icon={this.props.caretDown} /></MDBBtn>
                        <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="top">            
                        <form> 
                        <MDBModalBody>
                          <MDBCard style={modal} className="text-center">
                            <MDBBtn color="white"><MDBIcon far icon="images fa-2x" /> 사진 모아보기</MDBBtn>
                            <MDBBtn color="white"><MDBIcon icon="envelope fa-2x" /> 러브레터 보관함</MDBBtn>
                            <MDBBtn color="white"><MDBIcon icon="envelope fa-2x" /> S/T</MDBBtn>
                            <MDBBtn color="white"><MDBIcon icon="envelope fa-2x" /> S/T</MDBBtn>
                            <MDBBtn color="white"><MDBIcon icon="envelope fa-2x" /> S/T</MDBBtn>
                            <MDBBtn color="white"><MDBIcon icon="envelope fa-2x" /> S/T</MDBBtn>
                          </MDBCard>
                        </MDBModalBody>
                        </form>
                      </MDBModal>
                    </div>
                  }
                   {this.props.mode==="calendar"&&
                    <div>
                      <MDBModal isOpen={this.state.modal} toggle={this.t}>
                        <MDBModalHeader toggle={this.t}>이벤트 추가</MDBModalHeader>
                        <form> 
                        <MDBModalBody>
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="black-text">
                                  <MDBInput
                                    label="제목을 입력하세요"
                                    icon="circle fa-xs"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                  />
                                </div>
                                <div className="black-text">
                                <select className="browser-default custom-select">
                                  <option>유형 선택</option>
                                  <option value="1">데이트</option>
                                  <option value="2">여행</option>
                                  <option value="3">문화생활</option>
                                  <option value="4">학교</option>
                                  <option value="5">업무</option>
                                  <option value="6">개인</option>
                                </select>
                                </div>
                                <hr color="black" style={{borderBlockColor:"30"}}></hr>
                                <MDBListGroup className=" border-dark" >
                                  <MDBListGroupItem style={list1}>
                                      <span>하루 종일</span>
                                      <Switch onChange={this.handleChanged} checked={this.state.checked} />
                                  </MDBListGroupItem>
                                  <MDBListGroupItem style={list1}>
                                      <span>날짜</span>
                                      <DateRangePicker
                                          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                        />
                                  </MDBListGroupItem>
                                  <MDBListGroupItem style={list1}>
                                      <span>시작시간</span>
                                      <TimeInput
                                        hintText="12hr Format with auto ok"
                                        autoOk={true}
                                      />
                                  </MDBListGroupItem>
                                  <MDBListGroupItem style={list1}>
                                      <span>종료시간</span>
                                      <TimeInput
                                        hintText="12hr Format with auto ok"
                                        autoOk={true}
                                      />
                                  </MDBListGroupItem>
                                  <MDBListGroupItem>
                                  <MDBInput
                                      label="메모"
                                      type="textarea"
                                      validate
                                      error="wrong"
                                      success="right"
                                      maxLength="500"
                                    />
                                  </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCol>
                          </MDBRow>
                        </MDBModalBody>
                        
                        <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={this.t}>닫기</MDBBtn>
                  <Link to="#"><MDBBtn color="primary">로그인</MDBBtn></Link>
                </MDBModalFooter>
                </form>
            </MDBModal>          
            </div>
                }
                </MDBContainer>
              </MDBNavbar> 
      </React.Fragment>
    );
  };

  
}

  

export default M_nav;  