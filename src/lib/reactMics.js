import { ReactMic } from 'react-mic';
import React, { PureComponent } from 'react';
import {MDBBtn, MDBIcon} from 'mdbreact';

class reactMics extends PureComponent{

  
  render() {
    let recordPath = this.props.recordedBlob;
    if(recordPath!==null){
      recordPath = recordPath.blobURL;
    }
    return (
      <React.Fragment>
        <div className="text-center m-2">
          <div className="text-center m-1">
            <h3>음성녹음</h3>
          </div>
          <hr color="#000000" />
          <ReactMic
            record={this.props.record}
            className="sound-wave"
            onStop={this.props.onStop}
            onData={this.props.onData}
            strokeColor="#000000"
            backgroundColor="#03a9f4" />
          <div className="text-center m-1">
            <audio controls
              src={recordPath}
            />
          </div>
          <div className="text-center m-2">  
            <MDBBtn rounded className="p-2" color="#ffffff" onClick={this.props.startRecording}><MDBIcon icon="microphone fa-2x" ></MDBIcon></MDBBtn>
            <MDBBtn rounded className="p-2" color="#ffffff" onClick={this.props.stopRecording}><MDBIcon icon="stop-circle fa-2x" ></MDBIcon></MDBBtn>
          </div>
          <div className="text-center m-2">
            <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
            <MDBBtn color="info" onClick={this.props.setRecordData} >보내기</MDBBtn>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default reactMics;