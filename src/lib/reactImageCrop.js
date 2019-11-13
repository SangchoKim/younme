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


const mapStateToProps = (state) => ({
 
});


const mapDispatchToProps = (dispatch) => ({

})
    
export default connect(mapStateToProps, mapDispatchToProps) (reactImageCrop); 


