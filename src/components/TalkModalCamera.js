import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBInput,MDBBtn,MDBCard} from 'mdbreact';
import Webcam from "react-webcam";
import {imageEncodeToBase64} from '../lib/imageEncoder'
class TalkModalCamera extends PureComponent{

    state={
      sender:this.props.sender,
      getter:this.props.getter,
      isCapture:false,
      isReady:true,
      camera:{
        imageData: null,
        imageName:'',
      }
    }

    _setRef = (webcam) => {
      this.webcam = webcam;
    };

    _capture = (e) => {
      const imageSrc = this.webcam.getScreenshot();
      this.setState(prevState => ({
        ...prevState,
        isCapture:true,
        isReady:false,
        camera:{
          ...prevState.camera,
          imageData: imageSrc
          }
       }));
    };

    _onChangeCamera = (e) => {
      e.preventDefault();
      const {name,value} = e.target;
      console.log(name,value);
      this.setState(prev => ({
        ...prev,
        camera:{
          ...prev.camera,
          [name] : value
          }
       }));
    }
    
    _onClickRetake = (e) => {
      e.preventDefault();
      this.setState(prev => ({
        ...prev,
        isCapture:false,
        isReady:true,
        camera:{
          ...prev.camera,
          imageData: null,
          imageName:'',
          }
       }));
    }

    _setData = (e) => {
      e.preventDefault();
      console.log('TalkModalCamera 구역입니다.');
      const {imageData,imageName} = this.state.camera;
      const {sender,getter} = this.state;
      const myBlob = imageEncodeToBase64(imageData,'image/jpeg');
      let formData = new FormData();
      formData.append('myImages',myBlob,imageName);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      };
      fetch("/io/chat_camera", {method: "PATCH",
                          config,
                          body: formData 
                          })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
    }
    
    render(){
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
          };

        const {isReady,isCapture,} = this.state; 
        const {imageData,imageName} = this.state.camera;
        return(
            <React.Fragment>
              {isReady&&
                <MDBRow>
                  <MDBCol md="2" >
                    </MDBCol> 
                      <MDBCol md="8">
                        <MDBCard>
                          <div className="text-center">                        
                          <Webcam 
                              height={600}
                              width={600}
                              style={{textAlign:"center"}}
                              ref={this._setRef}
                              screenshotFormat="image/jpeg"
                              videoConstraints={videoConstraints}
                              />
                            </div>
                          </MDBCard>
                              <div className="black-text">                                                                       
                              <MDBInput
                                label="이미지의 이름을 입력해주세요"
                                name="imageName"
                                value={imageName}
                                onChange = {this._onChangeCamera}
                                type="text"
                                /> 
                                </div> 
                                <div>
                                  <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                                  <MDBBtn name="capture" color="info" onClick={this._capture} >촬영</MDBBtn> 
                                </div>                                         
                                </MDBCol>
                            </MDBRow>
                       }
                       {isCapture&&imageData&&
                        <form onSubmit={this._setData}>
                          <MDBRow>
                                <MDBCol md="4" >
                                </MDBCol> 
                                  <MDBCol md="4">
                                  <div className="text-center">     
                                    <MDBCard className="text-center mt-3" >
                                    <img src={imageData} alt='' width="500" height="auto"></img>
                                      </MDBCard>
                                      </div>
                                      <div className="text-center mt-3">                                                                        
                                        <h4>이미지 이름: {imageName}</h4>                                                                                                                      
                                      </div>
                                  </MDBCol>
                                  <div>
                                    <MDBBtn type="submit" name="save" color="success">저장</MDBBtn>
                                    <MDBBtn color="warning" onClick={this._onClickRetake} >재촬영</MDBBtn>
                                  </div>
                              </MDBRow>
                          </form>
                       }            
            </React.Fragment>
        )
    }


}

export default TalkModalCamera;