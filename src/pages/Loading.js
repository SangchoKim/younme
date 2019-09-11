import React, { PureComponent } from 'react'
import {_lottie} from '../lib/lottie'
import LoadingPage from '../components/Loading'

class Loading extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
        };
      }

      lodings;

    componentDidMount = () => {
    const url = '/main';
    _lottie('animation');   
    this.lodings = setTimeout( () => {
      console.log("animation done");
      this.props.history.push({
        pathname: url
      });    
      }, 5000); 
    }
     componentWillUnmount(){
      clearTimeout(this.lodings);
     }
    
    render(){
        return(
            <React.Fragment>
               <LoadingPage /> 
            </React.Fragment>
        )
    }
}

export default Loading;
