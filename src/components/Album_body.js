import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBCard,MDBBtn,MDBIcon} from 'mdbreact';
import Lightbox from 'react-image-lightbox';
import ImageEditor from '@toast-ui/react-image-editor'
const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    fontFamily:"a다정다감"
  }

class Album_body extends PureComponent{

  state = {
isOpen: false,
photoIndex: 0,
  }

    render(){

      const { photoIndex, isOpen } = this.state;
        return(
            <React.Fragment>
            {this.props.mode==="album"&&!this.props.defautImgeHave&&!this.props.imageNameShow&&
            <MDBRow style={font}>
            <MDBCol md="1" >
              </MDBCol> 
                <MDBCol md="10" >
                  <MDBCard className="p-2">
                    {this.props.check&& 
                      <React.Fragment>
                      <MDBRow style={this.props.font}> 
                      {this.props.imgUrls.map((image,index) => {
                      console.log("_imgUrls:",image);
                      return <MDBCol md="4" key={index}>
                              <div className="view overlay">
                              <img src={`/uploadsAlbum/${image}`}  onClick={() => this.setState({ isOpen: true })} 
                              alt="Logo" width="100%" height="" className="img-fluid z-depth-1 p-2"/>
                              <div className="mask flex-center rgba-green-slight">
                                <MDBBtn id={`/uploadsAlbum/${image}`} color="warning" size="sm" className="" name="sizeUp" onClick={() => this.setState({ isOpen: true })}><MDBIcon icon="search-plus fa-2x" /><br></br>확대</MDBBtn>
                                <MDBBtn id={`/uploadsAlbum/${image}`} color="indigo" size="sm" className="" name="update" onClick={this.props.onClick }><MDBIcon icon="marker fa-2x" /><br></br>수정</MDBBtn>
                                <MDBBtn id={`/uploadsAlbum/${image}`} color="danger" size="sm" className="" name="delete" onClick={this.props.onClick}><MDBIcon icon="trash fa-2x" /><br></br>삭제</MDBBtn>
                              </div>
                            </div>
                            
                            </MDBCol>
                      })}
                      </MDBRow> 
                      </React.Fragment>
                    }
                  </MDBCard>              
                </MDBCol>
                {isOpen && 
                (
                <Lightbox
                  mainSrc={"/uploadsAlbum/"+ this.props.imgUrls[photoIndex]}
                  nextSrc={this.props.imgUrls[(photoIndex + 1) % this.props.image.length]}
                  prevSrc={this.props.imgUrls[(photoIndex + this.props.image.length - 1) % this.props.image.length]}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + this.props.image.length - 1) % this.props.image.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % this.props.image.length,
                    })
                  }
                />
              )}
             </MDBRow>
            }
             {this.props.imageNameCheck&&
                  (
                <MDBRow style={font}>
                <form onSubmit={this.props.setData} >
                 <MDBCol md="1" >
                  </MDBCol> 
                  <MDBCol md="10">
                  <ImageEditor
                    includeUI={{
                    loadImage: {
                            path: this.props.imageName,
                            name: 'SampleImage'
                          },
                          menu: ['shape', 'filter','text','icon','crop','flip','mask'
                          ],
                          initMenu: 'filter',
                          uiSize: {
                            width: '1000px',
                            height: '700px'
                          },
                          menuBarPosition: 'bottom'
                        }}
                        cssMaxHeight={500}
                        cssMaxWidth={700}
                        selectionStyle={{
                          cornerSize: 20,
                          rotatingPointOffset: 70
                        }}
                        usageStatistics={true}
                  />
                  </MDBCol>
                  <MDBCol md="12" >
                  <div className="text-center">
                    <MDBBtn type="submit" name="save" color="success">수정</MDBBtn>
                    <MDBBtn color="secondary" name="update" onClick={this.props.onClick}>닫기</MDBBtn>                 
                  </div>  
                  </MDBCol>
                  </form> 
              </MDBRow>
                  )
                }  
            {this.props.mode==="album"&&this.props.defautImgeHave&&
              <MDBRow style={this.props.font}>
              <MDBCol md="1" >
              </MDBCol> 
                <MDBCol md="10">
                  <MDBCard>
                    <img src={this.props.defautImge} alt="Logo" width="100%" height="" />
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            } 
            </React.Fragment>
        )
    }


}

export default Album_body;