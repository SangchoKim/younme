import React,{Component} from 'react';
import SecondPage from '../components/Second'

class Second extends Component{

  constructor(){
    super();
    this.state = {
      mycode: '',
      invecode: ''
    }
  }

  onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value});
  }

  getdata = (e) => {
    e.preventDefault();
    const { invecode, mycode } = this.state;
    console.log("mycode:",mycode);
    console.log("invecode:",invecode);
    if(!invecode){
      alert('전달받은 초대코드를 먼저 입력해주세요');
      return;
    }
    fetch("/api/second",{method: "POST",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'invecode':invecode,'mycode':mycode})})
    .then(res => res.json())
    .then((res) =>{
      console.log(res.result);
      if(res.result===1){
      console.log('move to thired')
      this.props.history.push('/third');
      }else{
        alert('상대방이 아직 초대코대를 입력하기 전입니다.');
      }
     });
  }

  _setState = (_mycode,check) => {
    if(check)
    this.setState({mycode:_mycode});
    else
    this.setState({mycode:this.ran()});
  }

  backTofirst = () =>{
    const url = '/first';
    fetch("/api/backtofirst",{method: "POST",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'order':'readEmail'})})
    .then(res => res.json())
    .then((res) =>{
      console.log(res);
      if(res.result===1){
      console.log('read email');
      const email = res.email;
      console.log(email);
      this.props.history.push({
        pathname: url,
        state: { email: email}
        });
      }else{
        console.log(res.error);
      }
     }); 
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
          code = {this.state.mycode}
          location={this.props.location}
          getData={this.getdata}
          onChange={this.onChange}
          backTofirst={this.backTofirst}
          _setState={this._setState}
          invecode={this.state.invecode} 
        />
      </React.Fragment>
    );
  
  }
}
export default Second;


