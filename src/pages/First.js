import React,{PureComponent} from 'react';
import FirstPage from '../components/First' 

class First extends PureComponent{

  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({[e.target.name]:e.target.value});
  }

  getData = (e) => {
    e.preventDefault();
    const url = '/second';
    const { password, email } = this.state;
    console.log("email:",email,"password:",password);
    if(!email){
      alert('이메일을 입력해주세요');
      return;
    }
    if(!password){
      alert('패스워드를 입력해주세요');
      return;
    }
    fetch("/api/first",{method: "POST",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'password':password,'email':email})})
    .then(res => res.json())
    .then((res) =>{
      console.log(res);
      if(res.result===1){
      console.log('move to second')
      const _mycode = res.mycode;
        if(_mycode)
          this.props.history.push({
            pathname: url,
            state: { mycode: _mycode}
          });
        else
          this.props.history.push({
            pathname: url
          });
      }else{
        console.log(res.error);
      }
     });
  }

  _setState = (_email) => {
    this.setState({email:_email});
  }

  backTohome = () =>{
    const url = '/';
    fetch("/api/home",{method: "POST",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'order':'deleteSession'})})
    .then(res => res.json())
    .then((res) =>{
      console.log(res);
      if(res.result===1){
      console.log('delete to session')
      this.props.history.push(url);
      }else{
        console.log(res.error);
      }
     }); 
  }

  render(){
    return(
      <React.Fragment>  
        <FirstPage
          history={this.props.history}
          location={this.props.location}  
          getData={this.getData}
          onChange={this.onChange}
          email={this.state.email}
          password={this.state.password}
          backTohome={this.backTohome}
          _setState={this._setState}
          
        />
      </React.Fragment>
    );
  }
}   
export default First;


