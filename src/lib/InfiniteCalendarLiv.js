import React, { PureComponent } from 'react';
import InfiniteCalendar,{Calendar,withDateSelection} from 'react-infinite-calendar';
import {withHighlightedDates} from './withHighlightedDates'
import 'react-infinite-calendar/styles.css'; 
// Render the Calendar
const today = new Date();

class InfiniteCalendarLiv extends PureComponent{

    render(){
        // cosnt [] = this.props.data;
        return(
            <React.Fragment>
                <div className="text-center mr-4">
                    <InfiniteCalendar 
                        // Component={withDateSelection(withHighlightedDates(Calendar))}
                        // highlighted={this.props.data.map(d => d.format('YYYY-MM-DD'))}
                        mode={this.props.mode}
                        displayOptions={{
                        layout: 'landscape'
                        }}
                        width={'auto'}
                        height={1000}
                        selected={today}         
                        minDate={today}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default InfiniteCalendarLiv;