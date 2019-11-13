import React, { PureComponent } from 'react';
import { DayPickerSingleDateController ,isSameDay} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux';
import moment from 'moment';
import CalendarDateInfo from '../components/Calendar_dateInfo';

class DataPicker extends PureComponent{

    state={
       date:null,
       focused:null,
       isOpen:false,
       result:null,
      
    }

    _renderDay = (day) => {
        const {datas} = this.props;
        const _date = datas.map((d)=>{return d.s_date});
        return _date.some(_date => isSameDay(moment(_date),moment(day))); 
    }

    _read = async(d) => {
      setTimeout(() => {
      this.setState({date:d});
      const {date}= this.state;
      const {datas}= this.props;
      const clickedDates = moment(date).format("YYYY-MM-DD");
      this._readData(datas,clickedDates).then((result)=>{
          if(result.length!==0){
              this._set(true, result);
          }else{
              this._set(false,result);
          }
          
      })  
      }, 200);
      
  }

    _set = async(c, result) => {
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
                    <CalendarDateInfo
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


const mapStateToProps = (state) => ({
    datas: state.Calendar.data,
});
  

const mapDispatchToProps = (dispatch) => ({

})
      
export default connect(mapStateToProps, mapDispatchToProps) (DataPicker);