import React, { PureComponent } from 'react'
import Lottie from 'lottie-react-web';
import animation from '../lotties/159-servishero-loading.json'

class Loading extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
        };
      }

      lodings;

    componentDidMount = () => {
    const url = '/main'; 
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
               <Lottie
                  options={{
                    animationData: animation,
                    loop: true,
                    autoplay: true,
                  }}
                />
            </React.Fragment>
        )
    }
}

export default Loading;
