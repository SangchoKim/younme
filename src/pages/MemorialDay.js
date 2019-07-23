import React,{Component} from 'react';
import Titile from '../components/Titile'  
import MemorialHeader from '../components/M_header'
import MemoryfirstBody from '../components/Memory_firstBody'
import MemorysecondBody from '../components/Memory_secondBody'
import { connect } from 'react-redux';


class MemorialDay extends Component{
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
        />
        <MemorialHeader />
        <MemoryfirstBody 
          firstSpaceDay={this.props.firstSpaceDay}
          secondSpaceDay={this.props.secondSpaceDay}
          thirdSpaceDay={this.props.thirdSpaceDay}
          forthSpaceDay={this.props.forthSpaceDay}
          firstSpaceLeftDay={this.props.firstSpaceLeftDay}
          secondSpaceLeftDay={this.props.secondSpaceLeftDay}
          thirdSpaceLeftDay={this.props.thirdSpaceLeftDay}
          forthSpaceLeftDay={this.props.forthSpaceLeftDay}
        />
        <MemorysecondBody
          firstDay={this.props.firstDay}
          SeeingDay={this.props.SeeingDay}
          guyName={this.props.guyName}
          guyBirthday={this.props.guyBirthday}
          girlName={this.props.girlName}
          girlBirthday={this.props.girlBirthday}
        />
      </React.Fragment>
    )
  }
}


// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
  title: state.MemorialDay.Title.title,
  back: state.MemorialDay.Title.back,
  update: state.MemorialDay.Title.update,
  backUrl: state.MemorialDay.Title.backUrl,
  updateUrl: state.MemorialDay.Title.updateUrl,
  mainIcon: state.MemorialDay.Title.icon.main,
  rightIcon: state.MemorialDay.Title.icon.update,
  backIcon: state.MemorialDay.Title.icon.back,
  firstSpaceDay : state.MemorialDay.MemorialBody.firstSpace.firstSpaceDay,
  secondSpaceDay : state.MemorialDay.MemorialBody.secondSpace.secondSpaceDay,
  thirdSpaceDay : state.MemorialDay.MemorialBody.thirdSpace.thirdSpaceDay,
  forthSpaceDay : state.MemorialDay.MemorialBody.forthSpace.forthSpaceDay,
  firstSpaceLeftDay : state.MemorialDay.MemorialBody.firstSpace.firstSpaceLeftDay,
  secondSpaceLeftDay : state.MemorialDay.MemorialBody.secondSpace.secondSpaceLeftDay,
  thirdSpaceLeftDay : state.MemorialDay.MemorialBody.thirdSpace.thirdSpaceLeftDay,
  forthSpaceLeftDay : state.MemorialDay.MemorialBody.forthSpace.forthSpaceLeftDay, 
  firstDay : state.MemorialDay.MemorialBody.firstDay.firstDay, 
  SeeingDay : state.MemorialDay.MemorialBody.firstDay.SeeingDay, 
  guyName : state.MemorialDay.MemorialBody.guy.name, 
  guyBirthday : state.MemorialDay.MemorialBody.guy.birthday,  
  girlName : state.MemorialDay.MemorialBody.girl.name,  
  girlBirthday : state.MemorialDay.MemorialBody.girl.birthday,  
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({

})
    
export default connect(mapStateToProps, mapDispatchToProps) (MemorialDay);


