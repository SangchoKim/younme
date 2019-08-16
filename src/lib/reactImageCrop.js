import React, {PureComponent} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { connect } from 'react-redux';



class reactImageCrop extends PureComponent {

  state = {
    crop:{
      unit: '%',
      maxWidth : '100%', maxHeight : '100%',
    }

  }

  _crop = (crop) =>{
    // image in dataUrl
    console.log(crop);
    this.setState({crop:crop});
    this.props.onChange(crop, this.imageRef);
  }

  onImageLoaded = () => {
    this.imageRef = this.props.imageName;
  };
 
  render() {
    return ( 
      <ReactCrop 
        ref='cropper'
        src={this.props.imageName}
        onChange={this._crop}
        onImageLoaded={this.onImageLoaded} 
        crop={this.state.crop} 
        imageStyle ={{maxWidth : '100%', maxHeight : '100%',}}
        />
    );
  }
}

// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
 
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({

})
    
export default connect(mapStateToProps, mapDispatchToProps) (reactImageCrop); 


