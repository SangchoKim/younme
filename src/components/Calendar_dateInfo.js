import React, { PureComponent } from 'react';
import {MDBRow,MDBInput,MDBBtn,MDBCol,MDBCard,MDBListGroupItem,MDBListGroup,MDBCardHeader,MDBCardBody,MDBCardFooter,MDBIcon} from 'mdbreact';
import { connect } from 'react-redux';
import * as calendarAction from '../store/modules/Calendar';
import Calendarmodal from './Calendar_modal'

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
        sub:'',
        memo:'',
    }

    _onClick = async (e) => {
        e.preventDefault();

      const {id,name} = e.target;
      const {mode} = this.state;
      setTimeout(() => {
        if(name==="update"){
            
                console.log('_update_Calendar_dateInfo',id);
                fetch(`/api/updatecalendar?_id=${id}`, {method: "GET",
                                           headers: {
                                             'Accept': 'application/json',
                                             'Content-Type': 'application/json'
                                           }
                                           })
               .then(res => res.json())
               .then(res=>{
                 if(res.results===1){
                   const {setCalendarRead} = this.props;
                    console.log('캘린더Update 성공', res.data);
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
        await this.setState((pre)=>({
            ...pre,
            [name]: val
        }))
       
      }

    render(){

        const {isOpen, result}= this.props;
        let  {mode,sub,memo,startDate,endDate,startTime,endTime}= this.state;
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
                        <MDBCardHeader>{result.title}</MDBCardHeader>
                        <MDBCardBody>  
                            <MDBListGroup className="border-dark"> 
                            <MDBCardHeader>날짜</MDBCardHeader>
                                <MDBListGroupItem style={list1}>   
                                    <React.Fragment >
                                        <div className="ml-2">{result.s_date}</div>
                                        <div className="ml-2">{result.e_date}</div>
                                    </React.Fragment >
                                </MDBListGroupItem>
                            </MDBListGroup>
                            <MDBListGroup className="border-dark">
                                <MDBCardHeader>시간</MDBCardHeader> 
                                <MDBListGroupItem style={list1}> 
                                    <React.Fragment >
                                        <div className="ml-2">{result.s_time}</div>
                                        <div className="ml-2">{result.e_time}</div>
                                    </React.Fragment >
                                </MDBListGroupItem>
                            </MDBListGroup>
                            <MDBListGroup className="border-dark">
                                <MDBCardHeader>메모</MDBCardHeader> 
                                <MDBListGroupItem style={list1}> 
                                    <React.Fragment >
                                        <div className="ml-2">{result.memo}</div>
                                    </React.Fragment >
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
                          <div className="mask flex-center rgba-green-slight">
                                <MDBBtn id={result._id} color="indigo" size="sm" name="ready" onClick={this._onClick} ><MDBIcon icon="marker fa-2x" /><br></br>수정</MDBBtn>
                                <MDBBtn id={result._id} color="danger" size="sm" name ="delete" onClick={this._onClick}><MDBIcon icon="trash fa-2x" /><br></br>삭제</MDBBtn>
                          </div>  
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
                    <Calendarmodal
                      mode={this.props.mode}
                      modal={this.props.modal}
                      t={this.props.t}
                      list1={list2}
                    />
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