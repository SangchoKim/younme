import React,{Component} from 'react';
import FirstPage from '../components/First' 

class First extends Component{

  constructor(){
    super();
    this.state = {
      
    }
  }

  render(){
    return(
      <React.Fragment>  
        <FirstPage
          history={this.props.history} 
        />
        
      </React.Fragment>
    );
  }
}   
export default First;


