import React,{PureComponent} from 'react';
import Titile from '../components/Titile'
import { connect } from 'react-redux';
import * as calendarAction from '../store/modules/Calendar';
import CalendarBody from '../components/Calendar_Body'



// const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class Calendar extends PureComponent{


  state={
    modal:false
  }

  t = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidUpdate(){
    const {startDate,endDate,startTime,endTime,order,sub,memo} = this.props;
    console.log('componentDidUpdate_calendar',order);
    if(order==="SUBMIT"){
      // server 로 전송
      const data = {
        startDate:startDate,
        endDate:endDate,
        startTime:startTime,
        endTime:endTime,
        sub:sub,
        memo:memo,
      }
      console.log('componentDidUpdate_calendar_submit',data);

      fetch("/api/setcalendar", {method: "POST",
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({'data':data})
                                })
    .then(res => res.json())
    .then(res=>{
      if(res.result===1){
        const {setCalendarRead} = this.props;
        console.log('캘린더Read 성공', res.data);
        setCalendarRead(res.data);
        this.setState({
          modal:!this.state.modal
        })
      }else if(res.result===5){
        alert('캘린더Read 실패');
      }
    })
    }
  }
  
  render(){
    console.log(this.props.mode);
    return(
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
          modal={this.state.modal}
          t={this.t}
        />
        <CalendarBody
          mode={this.props.mode}
        
        />
        
      </React.Fragment>
    )
  }
}
    
// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
  title: state.Calendar.Title.title,
  back: state.Calendar.Title.back,
  update: state.Calendar.Title.update,  
  backUrl: state.Calendar.Title.backUrl,
  updateUrl: state.Calendar.Title.updateUrl,
  mainIcon: state.Calendar.Title.icon.main,
  rightIcon: state.Calendar.Title.icon.update,
  mode: state.Calendar.Title.mode.show,
  backIcon: state.Calendar.Title.icon.back,
  startDate: state.Calendar.startDate,
  endDate: state.Calendar.endDate,
  startTime: state.Calendar.startTime,
  endTime: state.Calendar.endTime,
  order: state.Calendar.order,
  sub: state.Calendar.sub,
  memo: state.Calendar.memo,
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({
  setCalendarRead: (data) => dispatch(calendarAction.setCalendarRead(data)),
})
    
export default connect(mapStateToProps, mapDispatchToProps) (Calendar);



