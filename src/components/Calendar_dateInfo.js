import React, { PureComponent } from 'react';
import {MDBRow,MDBBtn,MDBCol,MDBCard,MDBListGroupItem,MDBListGroup,MDBCardHeader,MDBCardBody,MDBCardFooter,MDBIcon} from 'mdbreact';
import { connect } from 'react-redux';
import * as calendarAction from '../store/modules/Calendar';

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


class Calendar_dateInfo extends PureComponent{


    _delete = async (e) => {
     e.preventDefault();
     const _id = e.target.id;
     console.log('_delete_Calendar_dateInfo',_id);
     fetch(`/api/deletecalendar?_id=${_id}`, {method: "GET",
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

    render(){

        const {isOpen, result, onsubmit}= this.props;
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
                        {/* <form onSubmit={onsubmit}> */}
                         <MDBCardFooter>
                          <div className="mask flex-center rgba-green-slight">
                                <MDBBtn id={result._id} color="indigo" size="sm" className="" name="update" ><MDBIcon icon="marker fa-2x" /><br></br>수정</MDBBtn>
                                <MDBBtn id={result._id} color="danger" size="sm" onClick={this._delete}><MDBIcon icon="trash fa-2x" /><br></br>삭제</MDBBtn>
                          </div>  
                         </MDBCardFooter>
                         {/* </form> */}
                        </MDBCard>
                        </MDBCol>
                        
                        ) 
                    })}    
                    </MDBRow>  
                </MDBCol>   
               </MDBRow>
               
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