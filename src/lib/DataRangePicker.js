import React, { PureComponent } from 'react';
import { DateRangePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {dataArrange} from '../lib/moment'
class DataRangePicker extends PureComponent{


    state={
       startDate:null,
       endDate:null,
       focusedInput:null, 
    }

    componentDidUpdate(){
        console.log("componentDidUpdate_DataRangePicker");
        const {startDate,endDate} = this.state;
        const data = dataArrange(startDate,endDate);
        this.props.dateChange(data.startDate,data.endDate);
    }

    render(){
        return(
            <React.Fragment>
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
             />
            </React.Fragment>
        )
    }
}

export default DataRangePicker;