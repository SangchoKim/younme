import React,{PureComponent} from 'react';
import SecondPage from '../components/Second'

class Second extends PureComponent{

  constructor(){
    super();
    this.state = {
      mycode: '',
      invecode: '',
      oppentEmail:''
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  getdata = (e) => {
    e.preventDefault();
    const { invecode, mycode, oppentEmail } = this.state;
    if(!invecode){
      alert('상대방의 초대코드를 입력해주세요');
      return;
    }
    if(!oppentEmail){
      alert('상대방의 이메일을 입력해주세요');
      return;
    }
    fetch("/api/second",{method: "POST",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'invecode':invecode,'mycode':mycode,'oppentEmail':oppentEmail})})
    .then(res => res.json())
    .then((res) =>{
      if(res.result===1){
      this.props.history.push('/third');
      }else if(res.result===10){
        alert('상대방의 초대코드를 다시 한번 확인해주세요.');
      }else if(res.result===5){
        alert('등록되지 않은 이메일입니다.');
      }else if(res.result===15){
        alert('상대방이 초대코드를 입력하지 않았습니다.');
      }else{
        alert('오류발생');
      }
     });
  }

  _setState = async(_mycode,check) => {
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
      if(res.result===1){
      const email = res.email;
      this.props.history.push({
        pathname: url,
        state: { email: email}
        });
      }else{
        console.error(res.error);
      }
     }); 
  }

  ran = () => {
    return Math.floor(Math.random() * 1000001)+
    Math.floor(Math.random() * 1000001)+
    Math.floor(Math.random() * 1000001);
  }

  _changeCode = (code) =>{
    this.setState({
      mycode:code
    })
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
          oppentEmail={this.state.oppentEmail}
          changeCode={this.state._changeCode}  
        />
      </React.Fragment>
    );
  
  }
}
export default Second;


