import React, { PureComponent } from 'react';
import {MDBBtn,MDBRow,MDBCol,MDBCard} from 'mdbreact';


class TalkModalVideo extends PureComponent{

   video = null;
  _Onclick = () => {
    const myViedo = this.video;
    if (myViedo.paused) 
    myViedo.play(); 
    else 
    myViedo.pause(); 
  };

    render(){
        return(
          <React.Fragment>
          <form onSubmit={this.props.setVideoData}>
               <MDBRow>
                  <MDBCol md="12" >
                    <div className="text-center m-1">
                      <h3>동영상</h3>
                    </div>
                    <hr color="#000000" />
                  </MDBCol> 
                  <MDBCol md="4" >
                  </MDBCol> 
                    <MDBCol md="4">
                      <div className="custom-file">
                        <input
                          name="videoFile"
                          onChange = {this.props.onChangeVideo}
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01"
                          accept="video/mp4, video/x-m4v, video/*"
                        />
                      <label className="custom-file-label" htmlFor="inputGroupFile01">
                        Choose file
                      </label>
                      </div>
                      </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="4" >
                        </MDBCol> 
                        <MDBCol md="4">
                        <div className="text-center mt-3">
                          {this.props.videoFileisReady&&
                          <MDBCard >
                            <video ref={ref=>{this.video = ref}} src={this.props.videoFile} alt='' width="470" height="auto"></video>
                            <MDBBtn className="text-center" onClick={this._Onclick}>play</MDBBtn>
                          </MDBCard>
                          }
                        </div>
                        <div className="text-center mt-3">
                          <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                          <MDBBtn type="submit" name="submit" color="info" >보내기</MDBBtn>
                        </div>
                        </MDBCol>
                    </MDBRow>
                </form>
      </React.Fragment>
        )
    }


}

export default TalkModalVideo;