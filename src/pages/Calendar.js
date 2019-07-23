import React,{Component} from 'react';
import Titile from '../components/Titile'
import { connect } from 'react-redux';
import InfiniteCalendar from 'react-infinite-calendar';

import 'react-infinite-calendar/styles.css'; 


// Render the Calendar
const today = new Date();
// const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class Calendar extends Component{
  
  render(){
    console.log(this.props.mode);
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
        <div className="text-center mr-4">
          <InfiniteCalendar 
            mode={this.props.mode}
            displayOptions={{
              layout: 'landscape'
             }}
             width={window}
            height={1000}
            selected={today}         
            minDate={today}
          />
        </div>
      </React.Fragment>
    )
  }
}
    
// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
  title: state.Calendar.Title.title,
  back: state.Calendar.Title.back,
  update: state.Calendar.Title.update,  
  backUrl: state.Calendar.Title.backUrl,
  updateUrl: state.Calendar.Title.updateUrl,
  mainIcon: state.Calendar.Title.icon.main,
  rightIcon: state.Calendar.Title.icon.update,
  backIcon: state.Calendar.Title.icon.back,
  mode: state.Calendar.Title.mode.show
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({

})
    
export default connect(mapStateToProps, mapDispatchToProps) (Calendar);



