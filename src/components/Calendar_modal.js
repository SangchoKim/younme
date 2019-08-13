import React, { PureComponent } from 'react';
import {MDBBtn,MDBModalBody,MDBModal,MDBModalHeader,MDBRow,MDBCol,MDBInput,MDBListGroup,MDBListGroupItem,MDBModalFooter} from 'mdbreact';
import Switch from "react-switch";
import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimeInput from 'material-ui-time-picker';
import { Link  } from'react-router-dom';

class Calendar_modal extends PureComponent{
 
 
  state = {
    collapse: false,
    isWideEnough: false,
    checked: false,
    modal6: false,
    modal7: false,
    modal: false,
    switch1: true,
    switch2: false
  };

  handleChanged = (checked) => {
    this.setState({ checked });
  }

    render(){
        return(
            <React.Fragment>
               {this.props.mode==="calendar"&&
                    <div>
                      <MDBModal isOpen={this.props.modal} toggle={this.props.t}>
                        <MDBModalHeader toggle={this.props.t}>이벤트 추가</MDBModalHeader>
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
                                  <MDBListGroupItem style={this.props.list1}>
                                      <span>하루 종일</span>
                                      <Switch onChange={this.handleChanged} checked={this.state.checked} />
                                  </MDBListGroupItem>
                                  <MDBListGroupItem style={this.props.list1}>
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
                                  <MDBListGroupItem style={this.props.list1}>
                                      <span>시작시간</span>
                                      <TimeInput
                                        hintText="12hr Format with auto ok"
                                        autoOk={true}
                                      />
                                  </MDBListGroupItem>
                                  <MDBListGroupItem style={this.props.list1}>
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
                  <MDBBtn color="secondary" onClick={this.props.t}>닫기</MDBBtn>
                  <Link to="#"><MDBBtn color="primary">로그인</MDBBtn></Link>
                </MDBModalFooter>
                </form>
            </MDBModal>          
            </div>
                }
            </React.Fragment>
        )
    }


}

export default Calendar_modal;