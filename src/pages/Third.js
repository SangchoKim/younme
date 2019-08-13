import React,{PureComponent} from 'react';
 import ThirdPage from '../components/Third'  
 import moment from 'moment'
 class Third extends PureComponent{

  constructor(){
    super();
    this.state = {
      man:'',
      women:'',
      name:'',
      birthday:'',
      relday:''
    }
  }

  onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(e.target.checked);
    if(e.target.name==="man"||e.target.name==="women"){
      this.setState({[e.target.name]: e.target.checked});   
    }else{
      this.setState({[e.target.name]: e.target.value});
    }   
  }


  onDayChange = (day,name) => {
    
    let _day = moment(day);
    const d =_day.format('YYYY-MM-DD');
    const _name = name;
    this.setState({[_name]:d});
    console.log(name,d);
  }

  getdata = (e) => {
    e.preventDefault();
    const url = '/';
    const { man, women, name, birthday, relday } = this.state;
    console.log("man:",man);
    console.log("women:",women);
    console.log("name:",name);
    console.log("birthday:",birthday);
    console.log("relday:",relday);
    if(!man&&!women){
      alert('성별을 체크해주세요');
      return;
    }
    if(man&&women){
      alert('성별을 하나만 체크해주세요');
      return;
    }
    if(!name){
      alert('이름을 입력해주세요');
      return;
    }
    if(!birthday){
      alert('생일을 입력해주세요');
      return;
    }
    if(!relday){
      alert('처음만난날을 입력해주세요');
      return;
    }
    fetch("/api/third",{method: "POST",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'man':man,
                                              'women':women,
                                              'name':name,
                                              'birthday':birthday,
                                              'relday':relday                 
                                              })})
    .then(res => res.json())
    .then((res) =>{
      console.log(res.result);
      if(res.result===1){
      console.log('move to main');
      alert('회원가입이 완료되었습니다. 로그인을 해주세요');
      this.props.history.push({
        pathname: url,
        state: { DonotBacktoPage: true}
      });
      }else{
        console.log(res.error);
      }
     });
  }

  backTosecond = () =>{
    const url = '/second';
    fetch("/api/backtosecond",{method: "POST",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'order':'readmyCode'})})
    .then(res => res.json())
    .then((res) =>{
      console.log(res);
      if(res.result===1){
      console.log('read myCode');
      const mycode = res.mycode;
      console.log(mycode);
      this.props.history.push({
        pathname: url,
        state: { mycode: mycode}
        });
      }else{
        console.log(res.error);
      }
     }); 
  }

  render(){
    return(
      <React.Fragment>  
        <ThirdPage 
          history={this.props.history}
          location={this.props.location}
          getData={this.getdata}
          onChange={this.onChange}
          backTosecond={this.backTosecond}
          onDayChange={this.onDayChange}
        />
      </React.Fragment>
    );
  }
 }
export default Third;


