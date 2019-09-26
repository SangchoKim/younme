import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {MDBRow,MDBCol,MDBCard,MDBBtn,MDBIcon} from 'mdbreact';
import Lightbox from 'react-image-lightbox';

const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    fontFamily:"a다정다감"
  }

class Album_img extends PureComponent{
    state = {
        isOpen: false,
        photoIndex: 0,
          }
    render(){
        const { photoIndex, isOpen } = this.state;
        return(
            <React.Fragment>
          {this.props.mode==="album"&&!this.props.defautImgeHave&&!this.props.imageNameShow&&!this.props.imageNameCheck&&
            <MDBRow style={font}>
            <MDBCol md="1" >
              </MDBCol> 
                <MDBCol md="10" >
                  <MDBCard className="p-2">
                    {this.props.check&& 
                      <React.Fragment>
                      <MDBRow style={font}> 
                      {this.props.imgUrls.map((image,index) => {
                      console.log("_imgUrls:",image);
                      return <MDBCol md="4" key={index+image}>
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
            </React.Fragment>
        )
    }
}

// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
    mode: state.Album.Title.mode.show,
    imgUrls: state.Album.Body.imgUrl
  });

  // props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({
   
})


  export default connect(mapStateToProps, mapDispatchToProps) (Album_img);