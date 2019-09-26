import React, { PureComponent } from 'react';
import {MDBModalHeader} from 'mdbreact';

class Calendar_title extends PureComponent{

    render(){
        return(
            <React.Fragment>
              <MDBModalHeader toggle={this.props.t}>이벤트 추가</MDBModalHeader>
            </React.Fragment>
        )
    }
}

export default Calendar_title;