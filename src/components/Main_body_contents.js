import React, { PureComponent } from 'react';
import {MDBBtn,MDBIcon} from 'mdbreact';

class Main_body_contents extends PureComponent{

    render(){
        return(
            <React.Fragment>
              <div className="grey-text" style={this.props.list1}>
                <MDBBtn color="unique" className="m-5" name="camera" onClick={this.props.onClick}><MDBIcon icon="camera-retro fa-2x" /><br></br>카메라</MDBBtn>
                <MDBBtn color="unique"className="m-5" name="album" onClick={this.props.onClick}><MDBIcon icon="camera-retro fa-2x" /><br></br>앨범</MDBBtn>
              </div>               
            </React.Fragment>
        )
    }
}
export default Main_body_contents;