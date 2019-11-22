import React, { PureComponent } from 'react';
import {MDBBtn,MDBModalBody,MDBModal,MDBRow,MDBCol,MDBInput,MDBListGroup,MDBListGroupItem,MDBModalFooter} from 'mdbreact';
import Switch from "react-switch";
import CalendarTitle from './Calendar_title';
import CalendarCategory from './Calendar_category';
import DataRangePicker from '../lib/DataRangePicker';
import TimeInputLiv from '../lib/TimeInputLiv';
import { connect } from 'react-redux';
import * as calendarAction from '../store/modules/Calendar';

class Calendar_modal extends PureComponent{
 
 
  state = {
    collapse: false,
    isWideEnough: false,
    checked: false,
    modal6: false,
    modal7: false,
    modal: false,
    switch1: true,
    switch2: false,
    startDate:null,
    endDate:null,
    startTime:null,
    endTime:null,
    sub:'',
    memo:'',
  };

  handleChanged = (checked) => {
    this.setState({ checked });
  }

  _dateChange = (startDate,endDate) => {
    const {setCalendarData} = this.props;
    setCalendarData(startDate,endDate);
  }

  _timeChange = (key,val) => {
    const {setCalendarTime} = this.props;
    setCalendarTime(key,val);
  }

  _setSubMemo = () => {
    const {sub, memo} = this.state;
    const {setSubMemo} = this.props;
    setSubMemo(sub,memo);
  }

  _setCalendarCategory = (e) => {
    const category = e.target.value;
    console.log(category);
    const {setCategory} = this.props;
    setCategory(category);
  }

  _onchange = async(e) => {
    e.preventDefault();
    const name = e.target.name;
    const val = e.target.value;
    await this.setState((pre)=>({
        ...pre,
        [name]: val
    }))
    await this._setSubMemo();
  }
    render(){
      let {sub,memo} = this.state;
        return(
            <React.Fragment>    
                      <MDBModal isOpen={this.props.modal} toggle={this.props.t}>
                        <CalendarTitle t={this.props.t}  />
                        <MDBModalBody>
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="black-text">
                                  <MDBInput
                                    name="sub"
                                    label="제목을 입력하세요"
                                    icon="circle fa-xs"
                                    type="text"
                                    value={sub}
                                    onChange={this._onchange}
                                  />
                                </div>
                                <CalendarCategory 
                                  setCalendarCategory={this._setCalendarCategory}
                                />
                                <hr color="black" style={{borderBlockColor:"30"}}></hr>
                                <MDBListGroup className=" border-dark" >
                                  <MDBListGroupItem style={this.props.list1}>
                                      <span>날짜</span>
                                    <DataRangePicker
                                      dateChange={this._dateChange}
                                    />    
                                  </MDBListGroupItem>
                                  <MDBListGroupItem style={this.props.list1}>
                                      <span>시작시간</span>
                                      <TimeInputLiv
                                        timeName={'startTime'}
                                        timeChange={this._timeChange}
                                      />
                                  </MDBListGroupItem>
                                  <MDBListGroupItem style={this.props.list1}>
                                      <span>종료시간</span>
                                      <TimeInputLiv
                                         timeName={'endTime'}
                                         timeChange={this._timeChange}
                                      />
                                  </MDBListGroupItem>
                                  <MDBListGroupItem>
                                  <MDBInput
                                      name="memo"
                                      label="메모"
                                      type="textarea"
                                      maxLength="500"
                                      value={memo}
                                      onChange={this._onchange}
                                    />
                                  </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCol>
                          </MDBRow>
                        </MDBModalBody>    
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.props.t}>닫기</MDBBtn>
                    <MDBBtn type="submit" color="primary">등록</MDBBtn>
                </MDBModalFooter>
            </MDBModal>      
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
 
});

const mapDispatchToProps = (dispatch) => ({
  setCalendarData: (startDate,endDate) => dispatch(calendarAction.setCalendarData(startDate,endDate)),
  setCalendarTime: (name,val) => dispatch(calendarAction.setCalendarTime(name,val)),
  setSubMemo: (sub,memo) => dispatch(calendarAction.setSubMemo(sub,memo)),
  setCategory: (data) => dispatch(calendarAction.setCategory(data)),
})


export default connect(mapStateToProps, mapDispatchToProps) (Calendar_modal);