import React,{PureComponent} from 'react';
import Titile from '../components/Titile'
import { connect } from 'react-redux';
import * as calendarAction from '../store/modules/Calendar';
import CalendarBody from '../components/Calendar_Body'
import Loding from '../components/Loding';
class Calendar extends PureComponent{

  state={
    modal:false
  }

  t = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount(){
    const {setCalendarReads} = this.props;
    setCalendarReads();
  }

  componentWillUnmount(){
    const {calendarOut} = this.props;
    calendarOut();
  }

  _onsubmit = (e) => {
    e.preventDefault();
      const {startDate,endDate,startTime,endTime,sub,memo,insertCalendar,category} = this.props;
      const data = {
        startDate:startDate,
        endDate:endDate,
        startTime:startTime,
        endTime:endTime,
        sub:sub,
        memo:memo,
        category:category,
      }
      insertCalendar(data);
      this.setState({
        modal:!this.state.modal
      })
  }

  render(){
    const {calendarState} = this.props;

    return(
      <React.Fragment>
        {calendarState==="isReady"&&
          <Loding 
          comment={this.props.comment}
          />
        }
        {calendarState==="isFail"&&
          <p>에러발생</p>
        }
        {calendarState==='isSuccess'&&
          <React.Fragment>
            <form onSubmit={this._onsubmit}>
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
            </form>
            <CalendarBody
              mode={this.props.mode}
              modal={this.state.modal}
              t={this.t}
            />
          </React.Fragment>
        }
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
  sub: state.Calendar.sub,
  memo: state.Calendar.memo,
  category: state.Calendar.category,
  _id: state.Calendar._id,
  order: state.Calendar.order,
  comment: state.Calendar.comment,
  calendarState: state.Calendar.calendarState,
  errMessage: state.Calendar.errMessage,
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({
  setCalendarReads: () => dispatch(calendarAction.setCalendarReads()),
  insertCalendar: (data) => dispatch(calendarAction.insertCalendar(data)),
  calendarOut: () => dispatch(calendarAction.calendarOut()),
})
    
export default connect(mapStateToProps, mapDispatchToProps) (Calendar);



