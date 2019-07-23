import React,{Component} from 'react';
import Titile from '../components/Titile'
import Body from '../components/Memory_firstBody'
import { connect } from 'react-redux';  

class Alert extends Component{

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
          firstSpaceDay={this.props.State}
          secondSpaceDay={this.props.State}
          thirdSpaceDay={this.props.State}
          forthSpaceDay={this.props.State}
          leftIcon={this.props.alertIcon}
        
        />
      </React.Fragment>
    )
  }
}
    
// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
  title: state.Alert.Title.title,
  back: state.Alert.Title.back,
  update: state.Alert.Title.update,  
  backUrl: state.Alert.Title.backUrl,
  updateUrl: state.Alert.Title.updateUrl,
  mainIcon: state.Alert.Title.icon.main,
  rightIcon: state.Alert.Title.icon.update,
  backIcon: state.Alert.Title.icon.back,
  mode: state.Alert.Title.mode.show,
  State: state.Alert.Body.alert.State,
  alertIcon: state.Alert.Body.alert.icon
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({

})
    
export default connect(mapStateToProps, mapDispatchToProps) (Alert);



