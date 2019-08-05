import React,{Component} from 'react';
import Titile from '../components/Titile'  
import MemorialHeader from '../components/M_header'
import MemoryfirstBody from '../components/Memory_firstBody'
import MemorysecondBody from '../components/Memory_secondBody'
import { connect } from 'react-redux';
import * as MemorialDayAction from '../store/modules/MemorialDay';
import * as M_headerAction from '../store/modules/M_header';

class MemorialDay extends Component{

 componentDidMount = () => {
    fetch(`/api/main?momorial=${1}`,{method: "get",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                        })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(res.result===1){
      const _name = res.user_info.name;
      const _oppenetName = res.user_info.name;
      const _birthday = res.user_info.birth;
      const _relDay = res.user_info.relDay;
      const _first = res.user_info.calDay.first;
      const _second = res.user_info.calDay.second;
      const _third = res.user_info.calDay.third;
      const _forth = res.user_info.calDay.forth;
      const firstSection = {first:_first,second:_second,third:_third,forth:_forth,
                            birthday:_birthday,name:_name,oppenetName:_oppenetName,relDay:_relDay};
      const { setUserInfo } = this.props;
      setUserInfo(firstSection);
      const userBasicInfo = {name:_name,oppenetName:_oppenetName,relDay:_relDay};
      const { _setUserHeadInfo } = this.props;
      _setUserHeadInfo(userBasicInfo);
      this.setState({
        User_info:{
          userName:_name,
          oppenetName:_oppenetName,
          relDay:_relDay
        }
      })
     
      console.log("name:",_name);
      console.log("oppenetName:",_oppenetName);
      console.log("relDay:",_relDay);
    }else{
        console.log(res.error);
      }
     });
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
        />
        <MemorialHeader 
          userName={this.props.name}
          oppenetName={this.props.oppenetName}
          relDay={this.props.relDay}
        />
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
  name: state.Mheader.User_info.userName,
  oppenetName: state.Mheader.User_info.oppenetName,
  relDay: state.Mheader.User_info.relDay  
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (firstSection) => dispatch(MemorialDayAction.setUserInfo(firstSection)),
  _setUserHeadInfo: (userBasicInfo) => dispatch(M_headerAction.setUserHeadInfo(userBasicInfo))
  
})
    
export default connect(mapStateToProps, mapDispatchToProps) (MemorialDay);


