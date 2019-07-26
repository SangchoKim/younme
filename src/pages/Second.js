import React,{Component} from 'react';
import SecondPage from '../components/Second'

class Second extends Component{

  constructor(){
    super();
    this.state = {
      code: this.ran()
    }
  }

  ran = () => {
    return Math.floor(Math.random() * 1001)+
    Math.floor(Math.random() * 1001)+
    Math.floor(Math.random() * 1001);
  }

  render(){
    return(
      <React.Fragment>  
        <SecondPage 
          history={this.props.history} 
          code = {this.state.code}
        />
      </React.Fragment>
    );
  
  }
}
export default Second;


