import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBCard,MDBBtn,MDBInput} from 'mdbreact';
import AlbumImg from './Album_img'
import Cropper from '../lib/cropper'
import { connect } from 'react-redux';
// import Crop from '../lib/reactImageCrop'
// import imageEditor from '../lib/imageEditor'

const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    fontFamily:"a다정다감"
  }
const img = {
    height: '50%',
  }

class Album_body extends PureComponent{

  state={
      data: null,
  }

  _onChange = (_data) =>{
    console.log("modifiyedData",_data);
    this.setState({
       data:_data,
    })
  }

    render(){
        return(
            <React.Fragment>
            <AlbumImg
              font={font}
              imgUrls = {this.props.imgUrls}
              defautImgeHave={this.props.defautImgeHave}
              imageNameShow={this.props.imageNameShow}
              imageNameCheck={this.props.imageNameCheck}
              check={this.props.check}
              image={this.props.image}
              onClick = {this.props.onClick}
              mode = {this.props.mode}
            />
             {this.props.imageNameCheck&&
                  (
                <form onSubmit={this.props.setData} >
                <MDBRow style={font}>
                 <MDBCol md="1" >
                  </MDBCol> 
                  <MDBCol md="10" >
                    <MDBCard style={img}>
                    <Cropper
                      imageName = {this.props.imageName}
                      imgUrls = {this.props.imgUrlss}
                      onChange = {this._onChange}
                    /> 
                    </MDBCard>
                  </MDBCol>
                  <MDBCol md="1" >
                  </MDBCol> 
                  <MDBCol md="12" >
                  <div className="text-center">
                    <MDBInput type="hidden" id="data" name="myImage" value={this.state.data}/>
                    <MDBBtn type="submit" name="save" color="success">수정</MDBBtn>
                    <MDBBtn color="secondary" name="update" onClick={this.props.onClick}>닫기</MDBBtn>                 
                  </div>  
                  </MDBCol>
              </MDBRow>
              </form> 
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

// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
  modes: state.Album.Title.mode.show,
  imgUrlss: state.Album.Body.imgUrl
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({
})
    
export default connect(mapStateToProps, mapDispatchToProps) (Album_body); 