import React, { PureComponent } from 'react';
import { DayPickerSingleDateController ,isSameDay} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux';
import moment from 'moment';
import Calendar_dateInfo from '../components/Calendar_dateInfo';
class DataPicker extends PureComponent{


    state={
       date:null,
       focused:null,
       isOpen:false,
       result:null,
      
    }

   
    
    _renderDay = (day) => {
        const {data} = this.props;
        const _date = data.map((d)=>{return d.s_date});
        console.log("_renderDay_DataPicker",_date);
        return _date.some(_date => isSameDay(moment(_date),moment(day))); 
    }

    _read = async(d) => {
      setTimeout(() => {
      this.setState({date:d});
      const {date}= this.state;
      const {data}= this.props;
      const clickedDates = moment(date).format("YYYY-MM-DD");
      console.log("_read_clickedDates",clickedDates,data);
      this._readData(data,clickedDates).then((result)=>{
          if(result.length!==0){
              this._set(true, result);
          }else{
              this._set(false,result);
          }
          
      })  
      }, 200);
      
  }

    _set = async(c, result) => {
      console.log("result",c,result);
      if(await c){
           this.setState({
              isOpen : true,
              result: result,
          })
      }else{
           this.setState({
              isOpen : false,
              result: result,
          })
      }   
  }

    _readData = async(data,clickedDates) => {
      const result = await data.filter(data=>{
          return data.s_date === clickedDates ? data : null;
      });
      console.log("_readDatasss",result);
      return result;  
  }

    render(){
        return(
            <React.Fragment>
              <DayPickerSingleDateController 
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={this._read} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              numberOfMonths={3}
              daySize={50}
              isDayHighlighted={this._renderDay}
              isOutsideRange={date => date.isBefore(new Date(), 'day')}
              calendarInfoPosition={"bottom"}
              renderCalendarInfo={() => 
                (
                <Calendar_dateInfo
                  isOpen={this.state.isOpen}
                  result={this.state.result}
                  mode={this.props.mode}
                  modal={this.props.modal}
                  t={this.props.t}
                />
                )}
          
             />
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

  })
      
  export default connect(mapStateToProps, mapDispatchToProps) (DataPicker);