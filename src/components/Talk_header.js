import React, {PureComponent} from 'react';
import {MDBBtn, MDBIcon, MDBNavItem} from 'mdbreact';

class Talk_header extends PureComponent {

    render() {
        return (
            <React.Fragment>
                <MDBNavItem >
                    <MDBBtn outline="outline" color="blue" onClick={this.props.modalTalk}><MDBIcon icon={this.props.rightIcon}/>
                        <br></br>{this.props.update}</MDBBtn>
                </MDBNavItem>
            </React.Fragment>
        )
    }

}

export default Talk_header;