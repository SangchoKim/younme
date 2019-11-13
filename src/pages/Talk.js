import React,{PureComponent} from 'react';
import Titile from '../components/Titile'
import Body from '../components/M_body'   
import { connect } from 'react-redux';
import MediaHanler from '../lib/Mediahandier';

class Talk extends PureComponent{
  
  constructor(){
    super();

    this.state = {
      modalIsOpen:false,
      hasMedia: false,
      otherUserId: null,
      stream:null,
      userSteam:null,
    }

    this.mediaHanler = new MediaHanler();
  } 
  
  _modalTalk = async() => {
     this.setState(prev=>({
      ...prev,
      modalIsOpen: !this.state.modalIsOpen
    }));

    if(this.state.hasMedia===false){
      this.mediaHanler.getPermissions()
      .then((_stream) => {
        this.setState(prev=>({
          ...prev,
          hasMedia: true,
          stream:_stream
        }))
      })
    }else{
      await this.state.stream.getTracks().forEach(track => track.stop());
      await this.setState(prev=>({
        ...prev,
        hasMedia: false,
        stream:null
      }))
    }
  }


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
          modalTalk={this._modalTalk}
          modalIsOpen={this.state.modalIsOpen}
          stream={this.state.stream}
        />
        <Body 
           mode={this.props.mode}
           imgUrl={this.props.imgUrl}
           location={this.props.location}
           history={this.props.history} 
           
        />
      </React.Fragment>
    )
  }
}

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

const mapDispatchToProps = (dispatch) => ({

})
    
export default connect(mapStateToProps, mapDispatchToProps) (Talk);


