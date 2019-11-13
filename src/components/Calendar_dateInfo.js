import React, { PureComponent } from 'react';
import {MDBRow,MDBCol} from 'mdbreact';
import { connect } from 'react-redux';
import * as calendarAction from '../store/modules/Calendar';
import CalendarDateInfoMap from './Calendar_dateInfo_map';

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

    state={
        mode:'',
        startDate:null,
        endDate:null,
        startTime:null,
        endTime:null,
        sub:null,
        memo:null,
        category:null,
        setIniailSub: true,
        setIniailMemo: true,
        setIniailCategory:true,
    }

    _onClick = async (e) => {
        e.preventDefault();
        const {id,name} = e.target;
        if(name==="update"){
          if(window.confirm('정말로 수정 하시겠습니까?')){
            let {startDate,endDate,startTime,endTime,sub,memo,category} = this.state;
            const {updateCalendar,data} = this.props;
           
            if(await startDate===null||endDate===null){
              const result = data.filter(data => data._id===id && data);
              const {s_date,e_date,} = result[0];
              startDate = s_date;
              endDate = e_date;
            }

            if(await startTime===null||endTime===null){
                const result = data.filter(data => data._id===id && data);
                const {s_time,e_time} = result[0];
                startTime = s_time;
                endTime = e_time;
            }

            if(await sub===null){
                const result = data.filter(data => data._id===id && data);
                const {title} = result[0];
                sub = title;
            }

            if(await category===null){
                const result = data.filter(data => data._id===id && data);
                const cate = result[0].category;
                category = cate;
            }

            const datas ={id,startDate,endDate,startTime,endTime,sub,memo,category};
            updateCalendar(datas);
            this.setState((pre)=>({
                ...pre,
                setIniailSub:true,
                setIniailMemo:true,
                mode:'',
            }))  
          }else{
              return;
          } 
        }else if(name==="ready"){
            const {data} = this.props;
            const result = data.filter(data => data._id===id && data);
            const cate = result[0].category;
            this.setState(prev=>({
                ...prev,
                mode:"ready",
                category:cate,
            }));
            
        }else if(name==="delete"){
            const {deleteCalendar} = this.props;
            if(window.confirm('정말로 삭제 하시겠습니까?'))
            deleteCalendar(id);
            else
            return;   
        }  
    }

    _onchange = async(e) => {
        e.preventDefault();
        const name = e.target.name;
        const val = e.target.value;
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
        if(name==="category"){
            await this.setState((pre)=>({
                ...pre,
                setIniailCategory:false,
            }))  
        }  
        await this.setState((pre)=>({
            ...pre,
            [name]: val
        }))
       
      }

      _dateChange = async(startDate,endDate) => {
        await this.setState((pre)=>({
            ...pre,
            startDate:startDate,
            endDate:endDate,
        })) 
      }

      _timeChange = async(key,val) => {
        await this.setState((pre)=>({
            ...pre,
            [key]: val
        })) 
      }

    render(){
        const {isOpen}= this.props;
        let  {mode}= this.state;
        return(
            <React.Fragment>
            {isOpen&&   
               <MDBRow style={font}>
                <MDBCol md="1" >
                </MDBCol>
                <MDBCol md="10" >
                    <MDBRow style={font}>
                        <CalendarDateInfoMap
                          result = {this.props.result}
                          isOpen = {this.props.isOpen}
                          mode = {this.state.mode}
                          setIniailSub = {this.state.setIniailSub}
                          setIniailMemo = {this.state.setIniailMemo}
                          setIniailCategory = {this.state.setIniailCategory}
                          list1 = {list1}
                          memo = {this.state.memo}
                          sub = {this.state.sub}
                          category = {this.state.category}
                          onchange = {this._onchange}
                          dateChange = {this._dateChange}
                          timeChange = {this._timeChange}
                          onClick = {this._onClick}
                        />    
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

const mapStateToProps = (state) => ({
    data: state.Calendar.data,
});
  
  const mapDispatchToProps = (dispatch) => ({
    deleteCalendar: (_id) => dispatch(calendarAction.deleteCalendar(_id)),
    updateCalendar: (data) => dispatch(calendarAction.updateCalendar(data)),
  })
      
  export default connect(mapStateToProps, mapDispatchToProps) (Calendar_dateInfo);