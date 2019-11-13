import React, { PureComponent } from 'react';
import TimeInput from 'material-ui-time-picker';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {timeArrange} from '../lib/moment'


class TimeInputLiv extends PureComponent{

    state={
        timeVal:null,
     }

     componentDidUpdate(){
        const {timeChange,timeName}=this.props;
        const {timeVal} = this.state;
        timeChange(timeName,timeArrange(timeVal));
    }

    handleChange = (time) =>{
        this.setState({
            timeVal:time,
        })
    }

    render(){
        return(
            <React.Fragment>
              <TimeInput
                 onChange={(time) => this.handleChange(time)}
                autoOk={true}
            />
            </React.Fragment>
        )
    }
}

export default TimeInputLiv;