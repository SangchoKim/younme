import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBCard} from 'mdbreact';
import ReactMics from '../lib/reactMics';

class TalkModalVoice extends PureComponent{


    render(){
        return(
            <React.Fragment>
               <MDBRow>
                 <MDBCol md="12">
                  <MDBCard className="text-center">
                    <ReactMics
                      onClick={this.props.onClick}
                      startRecording={this.props.startRecording}
                      stopRecording={this.props.stopRecording}
                      onStop={this.props.onStop}
                      onData={this.props.onData}
                      setRecordData={this.props.setRecordData}
                      recordedBlob={this.props.recordedBlob}
                      record={this.props.record}
                    />
                  </MDBCard>
                 </MDBCol>
               </MDBRow>
            </React.Fragment>
        )
    }


}

export default TalkModalVoice;