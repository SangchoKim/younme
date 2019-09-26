import React, { PureComponent } from 'react';
import {MDBBtn,MDBIcon,MDBNavItem} from 'mdbreact';
class Album_header extends PureComponent{

    render(){
        return(
            <React.Fragment>
                <MDBNavItem >
                   <MDBBtn outline color="blue" onClick={this.props.toggle8(8)}><MDBIcon icon={this.props.rightIcon} /></MDBBtn>
                </MDBNavItem>
            </React.Fragment>
        )
    }
}

export default Album_header;