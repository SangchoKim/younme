import React, { PureComponent } from 'react';
import InfiniteCalendarLiv from '../lib/InfiniteCalendarLiv'
import { connect } from 'react-redux';
// import {toastUiCalendarLiv} from '../lib/toastUiCalendarLiv'
class Calendar_Body extends PureComponent{

    state ={
        s_date:[]
    }

    componentDidUpdate(){
        console.log('componentDidUpdate_Calendar_body', this.props.data);
        if(this.props.data){
            const s_date = this.props.data.map((data) => {return data.s_date});
            this.setState({
                "s_date":s_date
            })
        }
    }

    render(){
        return(
            <React.Fragment>
                <InfiniteCalendarLiv
                    data={this.state.s_date}
                />
            </React.Fragment>
        )
    }
}

// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => ({
    title: state.Calendar.Title.title,
    data: state.Calendar.data,
  });
  
  // props 값으로 넣어 줄 액션 함수들을 정의해줍니다
  const mapDispatchToProps = (dispatch) => ({

  })
      
  export default connect(mapStateToProps, mapDispatchToProps) (Calendar_Body);