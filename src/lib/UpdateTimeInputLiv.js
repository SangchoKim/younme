import React, { PureComponent } from 'react';
import TimeInput from 'material-ui-time-picker';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {timeArrange} from '../lib/moment'

class UpadteTimeInputLiv extends PureComponent{

    state={
        timeVal:String.prototype.valueOf(this.props.timeVal),
     }

     componentDidUpdate(){ 
        const {timeChange,timeName,s_time,e_time}=this.props;
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
                placeholder={this.state.timeVal}
                // autoOk={true}
            />
            </React.Fragment>
        )
    }
}

export default UpadteTimeInputLiv;