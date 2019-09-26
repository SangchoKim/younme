import React, { PureComponent } from 'react';
import AlbumImg from './Album_img'
import { connect } from 'react-redux';
import AlbumBodyUpdate from './Album_body_update';
import AlbumBodyDefault from './Album_body_default';

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
            {this.props.mode ==="album"&&
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
            }
             {this.props.imageNameCheck&&
              <AlbumBodyUpdate
                setData ={this.props.setData}
                font ={font}
                img ={img}
                imageName = {this.props.imageName}
                imgUrlss = {this.props.imgUrlss}
                onChange = {this._onChange}
                data = {this.state.data}
                onClick = {this.props.onClick}
              />
              }  
            {this.props.mode==="album"&&this.props.defautImgeHave&&
              <AlbumBodyDefault
                font = {this.props.font}
                defautImge ={this.props.defautImge}
              />
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