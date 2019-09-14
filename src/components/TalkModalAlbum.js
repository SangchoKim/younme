import React, { PureComponent } from 'react';
import {MDBBtn,MDBIcon,MDBRow,MDBCol,MDBCard} from 'mdbreact';


class TalkModalAlbum extends PureComponent{

    render(){
      console.log('this.props.imgUrls',this.props.imgUrls);
        return(
            <React.Fragment>
              <form onSubmit={this.props.setAlbumData}>
                <MDBRow>
                  <MDBCol md="12" >
                      <div className="text-center m-1">
                        <h3>공유 앨범</h3>
                      </div>
                      <hr color="#000000" />
                  </MDBCol> 
                {this.props.imgUrls.map((image,index) => {
                    return (
                        <MDBCol md="2" key={image + index + Date()}>
                          <div className="view overlay">
                            <img src={`/uploadsAlbum/${image}`}  onClick={() => this.setState({ isOpen: true })} 
                            alt="Logo" width="100%" height="" className="img-fluid z-depth-1 p-2"/>
                              <div className="mask flex-center rgba-green-slight">
                                <MDBBtn id={`/uploadsAlbum/${image}`} name={image} color="primary" size="sm" className="" onClick={this.props.onAlbumChoice}><MDBIcon icon="check fa-2x" /><br></br>선택</MDBBtn>
                              </div>
                          </div>
                        </MDBCol>
                      )
                    })
                    }
                    {this.props.isChoice&&this.props.albumFile&&
                    <MDBRow>
                      {this.props.albumFile.length>=1&&
                        <MDBCol md="12">
                          <hr color="black" width="100%"></hr>
                            <div className="text-center">
                              <h3>선택한 사진</h3>
                            </div>
                        </MDBCol>
                      }
                      {this.props.albumFile.map((data,index)=>{
                        console.log('data',data);
                        return(
                            <MDBCol md="2" key={data + index + Date()}>
                              <div className="text-center mt-3 view overlay">
                                <MDBCard>
                                  <img src={data.imagePath} alt='' width="500" height="auto"></img>
                                  <div className="mask flex-center rgba-green-slight">
                                    <MDBBtn id={data.imagePath} name='unselected' color="default" size="sm" className="" onClick={this.props.onAlbumChoice}><MDBIcon icon="check fa-2x" /><br></br>취소</MDBBtn>
                                  </div>
                                </MDBCard>
                              </div>
                            </MDBCol>
                          ) 
                        })
                      }
                      {this.props.albumFile.length>=1&&
                       <MDBCol md="12" >
                              <div className="text-center">
                                  <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                                  <MDBBtn type="submit" name="submit" color="info" >보내기</MDBBtn>
                              </div> 
                        </MDBCol>
                      }
                      </MDBRow>
                    }
                  </MDBRow>
                  {this.props.albumFile.length===0&&
                  <div className="text-center">
                      <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                  </div>
                  } 
                </form>  
          </React.Fragment>
        )
    }


}

export default TalkModalAlbum;