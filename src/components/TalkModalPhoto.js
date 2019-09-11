import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBBtn,MDBCard} from 'mdbreact';


class TalkModalPhoto extends PureComponent{

    state={
      file: null,
      realfile: null,
      sender:this.props.sender,
      getter:this.props.getter,
    }

    _onChangePhoto = (e) => {
      this.setState({
        file: URL.createObjectURL(e.target.files[0]),
        realfile:e.target.files[0]
      })
    }

    _setData = (e) => {
      e.preventDefault();
      console.log('TalkModalPhoto 구역입니다.');
      const {sender,getter} = this.state;
      let file = this.state.realfile;
      if(!file){
        alert('사진을 선택해주세요');
        return;
      }
      const formData = new FormData();
      formData.append('myImages',file);
      const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Accept': 'application/json'
        }
      };
       fetch(`/io/chat_photo?sender=${sender}&getter=${getter}`, 
                          {method: "PATCH",
                          config,
                          body: formData
                          })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })

    }
    render(){

        const file = this.state.file;

        return(
            <React.Fragment>
                <form onSubmit={this._setData}>
                     <MDBRow>
                        <MDBCol md="4" >
                        </MDBCol> 
                          <MDBCol md="4">
                            <div className="custom-file">
                              <input
                                name="myImage"
                                onChange = {this._onChangePhoto}
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01"
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
                                <MDBCard >
                                <img src={file} alt='' width="500" height="auto"></img>
                                </MDBCard>
                              </div>
                              <div className="text-center mt-3">
                                <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                                <MDBBtn type="submit" name="submit" color="info" >변경</MDBBtn>
                              </div>
                              </MDBCol>
                          </MDBRow>
                      </form>
            </React.Fragment>
        )
    }
}

export default TalkModalPhoto;