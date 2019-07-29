import React,{Component} from 'react';
import MainNav from '../components/M_nav'  
import MainHeader from '../components/M_header'
import MainBody from '../components/M_body'
import { connect } from 'react-redux';
import * as MypageAction from '../store/modules/Mypage';

class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      MainBody:{
        imgUrl:"https://images.unsplash.com/photo-1449495169669-7b118f960251?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
      }
    }
    
  }

  render(){ 
    return(
      <React.Fragment>  
      <MainNav 
         history={this.props.history}
         location={this.props.location}
         onMoveToPage={function(email,name,birthday,gender){
          this.props._onMoveToPage(email,name,birthday,gender);
         }.bind(this)}
      />
      <MainHeader />
      <MainBody 
        imgUrl={this.state.MainBody.imgUrl}
      />
    </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  title: state.Mypage.Title.title,
});

const mapDispatchToProps = (dispatch) => ({
  _onMoveToPage: (email,name,birthday,gender) => dispatch(MypageAction.onMoveToPage(email,name,birthday,gender)),

})
export default connect(mapStateToProps, mapDispatchToProps) (Main);


