import React, { PureComponent } from 'react';
import {MDBRow,MDBInput,MDBBtn,MDBCol,MDBCard,MDBListGroupItem,MDBListGroup,MDBCardHeader,MDBCardBody,MDBCardFooter,MDBIcon} from 'mdbreact';
import { connect } from 'react-redux';
import * as calendarAction from '../store/modules/Calendar';
import DataRangePicker from '../lib/UpdateDataRangePicker';
import TimeInputLiv from '../lib/UpdateTimeInputLiv';

const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    fontFamily:"a다정다감"
  }

  const list1 = {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
   }

   const list2 = {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems:'center'
   }


class Calendar_dateInfo extends PureComponent{

    state={
        mode:'',
        startDate:null,
        endDate:null,
        startTime:null,
        endTime:null,
        sub:null,
        memo:null,
        setIniailSub: true,
        setIniailMemo: true,
    }

    _onClick = async (e) => {
        e.preventDefault();

      const {id,name} = e.target;
     
      setTimeout(() => {
        if(name==="update"){
                const {startDate,endDate,startTime,endTime,sub,memo} = this.state;

                console.log('_update_Calendar_dateInfo',id);
                fetch('/api/updatecalendar', {method: "PATCH",
                                           headers: {
                                             'Accept': 'application/json',
                                             'Content-Type': 'application/json'
                                           },
                                           body: JSON.stringify({'data':{
                                            id:id,
                                            startDate:startDate&&startDate,
                                            endDate:endDate&&endDate,
                                            startTime:startTime&&startTime,
                                            endTime:endTime&&endTime,
                                            sub:sub&&sub,
                                            memo:memo&&memo,  
                                           }})
                                           })
               .then(res => res.json())
               .then(res=>{
                 if(res.results===1){
                   const {setCalendarRead} = this.props;
                    console.log('캘린더Update 성공', res.data);
                     this.setState((pre)=>({
                        ...pre,
                        setIniailSub:true,
                        setIniailMemo:true,
                        mode:'',
                    })) 
                    setCalendarRead(res.data);
                 }else if(res.results===5){
                   alert('캘린더Update 실패');
                 }
               })
           
           
        }else if(name==="ready"){
            const {mode} = this.state
            this.setState({mode:"ready"});
            console.log('_updateReady_Calendar_dateInfo',mode);

        }else if(name==="delete"){
            console.log('_delete_Calendar_dateInfo',id);
            window.confirm('정말로 삭제 하시겠습니까?')&&
            fetch(`/api/deletecalendar?_id=${id}`, {method: "GET",
                                       headers: {
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json'
                                       }
                                       })
           .then(res => res.json())
           .then(res=>{
             if(res.results===1){
               const {setCalendarRead} = this.props;
                console.log('캘린더Delete 성공', res.data);
                setCalendarRead(res.data);
             }else if(res.results===5){
               alert('캘린더Delete 실패');
             }
           })
     }  
        }, 100);
    }

    _onchange = async(e) => {
        e.preventDefault();
        const name = e.target.name;
        const val = e.target.value;
        console.log('_onchange_calendar_modify',name,val);

        if(name==="sub"){
            await this.setState((pre)=>({
                ...pre,
                setIniailSub:false,
            }))  
        } 

        if(name==="memo"){
            await this.setState((pre)=>({
                ...pre,
                setIniailMemo:false,
            }))  
        } 

        await this.setState((pre)=>({
            ...pre,
            [name]: val
        }))
       
      }

      _dateChange = async(startDate,endDate) => {
        console.log('_dataChange_Calendar',startDate,endDate);
        await this.setState((pre)=>({
            ...pre,
            startDate:startDate,
            endDate:endDate,
        })) 
      }

      _timeChange = async(key,val) => {
        console.log('_timeChange_Calendar',key,val);
        await this.setState((pre)=>({
            ...pre,
            [key]: val
        })) 
      }

    render(){

        const {isOpen, result}= this.props;
        let  {mode,sub,setIniailSub,setIniailMemo,memo}= this.state;
        return(
            <React.Fragment>
            {isOpen&&   
               <MDBRow style={font}>
                <MDBCol md="1" >
                </MDBCol>
                <MDBCol md="10" >
                    <MDBRow style={font}>
                    {result.map((result)=>{
                        return(
                        <MDBCol md="4" key={result._id} >   
                        <MDBCard className="mt-2" >
                        {mode==="ready"&& isOpen
                            ?
                        <MDBCardHeader>
                        <MDBInput
                           name="sub"
                           type="text"
                           value={setIniailSub?result.title:sub}
                           onChange={this._onchange} 
                        />
                        </MDBCardHeader>
                            :
                        <MDBCardHeader>{result.title}</MDBCardHeader>
                            }           
                        <MDBCardBody>  
                            <MDBListGroup className="border-dark"> 
                            <MDBCardHeader>날짜</MDBCardHeader>
                            {mode==="ready"&& isOpen
                                ?         
                                <DataRangePicker 
                                    s_date={result.s_date}
                                    e_date={result.e_date}
                                    dateChange={this._dateChange}
                                />            
                                :
                            <MDBListGroupItem style={list1}>   
                                    <React.Fragment >
                                        <div className="ml-2">{result.s_date}</div>
                                        <div className="ml-2">{result.e_date}</div>
                                    </React.Fragment >
                                </MDBListGroupItem>
                            }
                            </MDBListGroup>
                            <MDBListGroup className="border-dark">
                                <MDBCardHeader>시간</MDBCardHeader>
                                {mode==="ready"&& isOpen
                                ?
                                <MDBListGroupItem style={list1}> 
                                    <TimeInputLiv
                                        timeName={'startTime'}
                                        timeChange={this._timeChange}
                                        timeVal={result.s_time}
                                    />
                                    <TimeInputLiv
                                        timeName={'endTime'}
                                        timeChange={this._timeChange}
                                        timeVal={result.e_time}
                                    />
                                </MDBListGroupItem>
                                :
                                <MDBListGroupItem style={list1}> 
                                    <React.Fragment >
                                        <div className="ml-2">{result.s_time}</div>
                                        <div className="ml-2">{result.e_time}</div>
                                    </React.Fragment >
                                </MDBListGroupItem>
                                }
                            </MDBListGroup>
                            <MDBListGroup className="border-dark">
                                <MDBCardHeader>메모</MDBCardHeader> 
                                <MDBListGroupItem style={list1}>
                                {mode==="ready"&& isOpen
                                 ?
                                <MDBInput
                                    name="memo"
                                    type="textarea"
                                    maxLength="500"
                                    value={setIniailMemo?result.memo:memo}
                                    onChange={this._onchange}
                                /> 
                                :    
                                <React.Fragment >
                                    <div className="ml-2">{result.memo}</div>
                                </React.Fragment >
                                }
                                </MDBListGroupItem>
                            </MDBListGroup>
                            <MDBListGroup className="border-dark"> 
                                <MDBCardHeader>작성자</MDBCardHeader>
                                <MDBListGroupItem style={list1}> 
                                    <React.Fragment >
                                        <div className="ml-2">{result.author}</div>
                                    </React.Fragment >
                                </MDBListGroupItem>
                            </MDBListGroup>
                        </MDBCardBody> 
                         <MDBCardFooter>
                         {mode==="ready"&& isOpen
                         ?
                         <div className="mask flex-center rgba-green-slight">
                                <MDBBtn id={result._id} color="info" size="sm" name="update" onClick={this._onClick} ><MDBIcon icon="marker fa-2x" /><br></br>수정</MDBBtn>
                                <MDBBtn id={result._id} color="danger" size="sm" name ="delete" onClick={this._onClick}><MDBIcon icon="trash fa-2x" /><br></br>삭제</MDBBtn>
                          </div>  
                         :
                          <div className="mask flex-center rgba-green-slight">
                                <MDBBtn id={result.id}  color="indigo" size="sm" name="ready" onClick={this._onClick} ><MDBIcon icon="marker fa-2x" /><br></br>수정</MDBBtn>
                                <MDBBtn id={result._id} color="danger" size="sm" name ="delete" onClick={this._onClick}><MDBIcon icon="trash fa-2x" /><br></br>삭제</MDBBtn>
                          </div>  
                          }
                         </MDBCardFooter>
                        </MDBCard>
                        </MDBCol>
                        
                        ) 
                    })}    
                    </MDBRow>  
                </MDBCol>   
               </MDBRow>
                }
                {mode==="ready"&& isOpen&&
                <React.Fragment>

                </React.Fragment>    
                }
                {!isOpen&&
                   <MDBRow style={font}>
                   <MDBCol md="1" >
                   </MDBCol>
                   <MDBCol md="10" className="black-text" >
                    <h1>해당하는 일정이 없습니다. 일정을 등록해주세요</h1>
                   </MDBCol>
                   </MDBRow> 
                }
            </React.Fragment>
        )
    }


}

// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
    data: state.Calendar.data,
  });
  
  // props 값으로 넣어 줄 액션 함수들을 정의해줍니다
  const mapDispatchToProps = (dispatch) => ({
    deleteCalendar: (_id) => dispatch(calendarAction.deleteCalendar(_id)),
    setCalendarRead: (data) => dispatch(calendarAction.setCalendarRead(data)),
  })
      
  export default connect(mapStateToProps, mapDispatchToProps) (Calendar_dateInfo);