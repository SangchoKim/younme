import React,{Component} from 'react';
 import ThirdPage from '../components/Third'  

 class Third extends Component{

  constructor(){
    super();
    this.state = {
     
    }
  }

  render(){
    return(
      <React.Fragment>  
        <ThirdPage 
          history={this.props.history}
          location={this.props.location}
        />
      </React.Fragment>
    );
  }
 }
export default Third;


