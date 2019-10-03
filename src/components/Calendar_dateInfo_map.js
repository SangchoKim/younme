import React, { PureComponent } from 'react';
import {MDBInput,MDBBtn,MDBCol,MDBCard,MDBListGroupItem,MDBListGroup,MDBCardHeader,MDBCardBody,MDBCardFooter,MDBIcon} from 'mdbreact';
import DataRangePicker from '../lib/UpdateDataRangePicker';
import TimeInputLiv from '../lib/UpdateTimeInputLiv';
import CalendarDataInfoCategory from './Calendar_dataInfo_Category';

class Calendar_dateInfo_map extends PureComponent{
    render(){

        const {isOpen, result, mode, setIniailSub, setIniailMemo,
                list1, memo, sub}= this.props;
        return(
            <React.Fragment>
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
                           onChange={this.props.onchange} 
                        />
                        </MDBCardHeader>
                            :
                        <MDBCardHeader>{result.title}</MDBCardHeader>
                            }           
                        <MDBCardBody>  
                            <MDBListGroup className="border-dark">
                            <MDBCardHeader>유형</MDBCardHeader>
                            <MDBListGroupItem style={list1}>
                            {mode==="ready"&& isOpen
                                 ?
                                <CalendarDataInfoCategory
                                 onchange = {this.props.onchange}
                                 category = {this.props.category}  
                                /> 
                                :    
                                <React.Fragment >
                                    <div className="ml-2">{result.category===1?"데이트":
                                                            result.category===2?"여행":
                                                            result.category===3?"문화생활":
                                                            result.category===4?"학교":
                                                            result.category===5?"업무":
                                                            result.category===5?"개인":"선택안함"}</div>
                                </React.Fragment >
                                }
                            </MDBListGroupItem> 
                            <MDBCardHeader>날짜</MDBCardHeader>
                            {mode==="ready"&& isOpen
                                ?         
                                <DataRangePicker 
                                    s_date={result.s_date}
                                    e_date={result.e_date}
                                    dateChange={this.props.dateChange}
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
                                        timeChange={this.props.timeChange}
                                        timeVal={result.s_time}
                                    />
                                    <TimeInputLiv
                                        timeName={'endTime'}
                                        timeChange={this.props.timeChange}
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
                                    onChange={this.props.onchange}
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
                                <MDBBtn id={result._id} color="info" size="sm" name="update" onClick={this.props.onClick} ><MDBIcon icon="marker fa-2x" /><br></br>수정</MDBBtn>
                                <MDBBtn id={result._id} color="danger" size="sm" name ="delete" onClick={this.props.onClick}><MDBIcon icon="trash fa-2x" /><br></br>삭제</MDBBtn>
                          </div>  
                         :
                          <div className="mask flex-center rgba-green-slight">
                                <MDBBtn id={result._id}  color="indigo" size="sm" name="ready" onClick={this.props.onClick} ><MDBIcon icon="marker fa-2x" /><br></br>수정</MDBBtn>
                                <MDBBtn id={result._id} color="danger" size="sm" name ="delete" onClick={this.props.onClick}><MDBIcon icon="trash fa-2x" /><br></br>삭제</MDBBtn>
                          </div>  
                          }
                         </MDBCardFooter>
                        </MDBCard>
                        </MDBCol>
                        
                        ) 
                    })}    
            </React.Fragment>
        )
    }


}

  export default (Calendar_dateInfo_map);