import React, { PureComponent } from 'react';
import {MDBBtn,MDBIcon,MDBNavItem} from 'mdbreact';

class Calendar_header extends PureComponent{

    render(){
        return(
            <React.Fragment>
                <MDBNavItem >
                    <MDBBtn outline color="blue" onClick={this.props.t}><MDBIcon icon={this.props.rightIcon} /></MDBBtn>
                </MDBNavItem>
            </React.Fragment>
        )
    }
}

export default Calendar_header;