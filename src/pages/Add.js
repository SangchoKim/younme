import React, { Component } from 'react';
import Main from '../components/Main';
import SignUp from '../components/SignUp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class Add extends Component{

    render(){
        return(
            <React.Fragment>
                <Main />
                <SignUp 
                    history={this.props.history}
                    location={this.props.location} 
                />
            </React.Fragment>
        )

    }

}

export default Add;


