import React,{Component} from 'react';
import Titile from '../components/Titile'
import Body from '../components/M_body'
import { connect } from 'react-redux';
  

class Album extends Component{


  componentDidMount(){

    fetch("/api/customers")
    .then(res => console.log(res.text()))
    .then(customers=> this.setState({customers}, () =>console.log('Customers fet',customers)))
  
  };
  
  render(){
    return(
      <React.Fragment>  
        <Titile 
          title={this.props.title}
          back={this.props.back}
          update={this.props.update}
          backUrl={this.props.backUrl}
          updateUrl={this.props.updateUrl}
          mainIcon={this.props.mainIcon}
          rightIcon={this.props.rightIcon}
          backIcon={this.props.backIcon}
          mode={this.props.mode}
        />
        <Body 
           mode={this.props.mode}
           imgUrl={this.props.imgUrl}
        />
      </React.Fragment>
    )
  }
}
    
// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
  title: state.Album.Title.title,
  back: state.Album.Title.back,
  update: state.Album.Title.update,  
  backUrl: state.Album.Title.backUrl,
  updateUrl: state.Album.Title.updateUrl,
  mainIcon: state.Album.Title.icon.main,
  rightIcon: state.Album.Title.icon.update,
  backIcon: state.Album.Title.icon.back,
  mode: state.Album.Title.mode.show,
  imgUrl: state.Album.Body.imgUrl
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({

})
    
export default connect(mapStateToProps, mapDispatchToProps) (Album);



