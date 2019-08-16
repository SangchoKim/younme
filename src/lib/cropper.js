import React, {PureComponent} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { connect } from 'react-redux';
import * as AlbumAction from '../store/modules/Album'

class cropper extends PureComponent {

  _crop = () =>{
    // image in dataUrl
    const data = this.refs.cropper.getCroppedCanvas().toDataURL();
    this.props.onChange(data);
  }
 
  render() {
    return (
      <Cropper
        ref='cropper'
        src={this.props.imageName}
        style={{height:"100%"}}
        // Cropper.js options
        aspectRatio={16 / 9}
        guides={true}
        crop={this._crop} 
        responsive={true}
        center={true}
        highlight={true}
        background={true}
        movable={true}
        rotatable={true}
        scalable={true}
        zoomable={true}
        zoomOnTouch={true}
        zoomOnWheel={true}
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
    
export default connect(mapStateToProps, mapDispatchToProps) (cropper); 


