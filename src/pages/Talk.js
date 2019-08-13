import React,{PureComponent} from 'react';
import Titile from '../components/Titile'
import Body from '../components/M_body'   
import { connect } from 'react-redux';

class Talk extends PureComponent{
  
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
          caretDown={this.props.caretDown}
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
  title: state.Talk.Title.title,
  back: state.Talk.Title.back,
  update: state.Talk.Title.update,  
  backUrl: state.Talk.Title.backUrl,
  updateUrl: state.Talk.Title.updateUrl,
  mainIcon: state.Talk.Title.icon.main,
  rightIcon: state.Talk.Title.icon.update,
  backIcon: state.Talk.Title.icon.back,
  caretDown: state.Talk.Title.icon.caretDown,
  mode: state.Talk.Title.mode.show,
  imgUrl: state.Talk.Body.imgUrl
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({

})
    
export default connect(mapStateToProps, mapDispatchToProps) (Talk);


