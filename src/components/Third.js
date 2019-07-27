import React,{Component} from 'react';
import {MDBContainer,MDBCard ,MDBRow,MDBCol,MDBInput, MDBCardBody, MDBBtn, MDBIcon, MDBFooter, MDBCardHeader } from 'mdbreact';
import'./App.css';
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const font = {
    color:"black",
    fontWeight:"bold",
    marginRight:30,
    fontSize:17,
    fontFamily:"a다정다감"
  }

const left ={
  textAlign:"left",
}

const sex ={
  display:"flex",
  flexDirection: "row",
  justifyContent: "center",
}


class Third extends Component{ 

  constructor() {
    super();
    this.state = {
      man:'',
      women:'',
      name:'',
      birthday:'',
      relday:''
    };
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
    const url = '/main';
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
      console.log('move to main')
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
      <MDBContainer>
        <section style={font} className="text-center my-5">
            <h2 className="h1-responsive font-weight-bold my-5">
              Third-Step
            </h2>
            <p className="w-responsive mx-auto mb-5">
                You&ME에 처음 오신 것을 환영합니다!<br></br>회원으로 가입해주세요.
            </p>
            <MDBRow>
             <MDBCol md="3">
              </MDBCol>
                <MDBCol md="6">
                  <MDBCard>
                  <MDBCardHeader className="aqua-gradient">
                      <h4 className="font-weight-bold white-text">연결성공!! 프로필을 입력해주세요.</h4>
                  </MDBCardHeader>
                  <MDBCardBody >
                    <form onSubmit={this.getdata}>
                      <div style={sex}>    
                        <MDBInput
                            name="man"
                            icon="mars"
                            label="남성"
                            type="checkbox"
                            validate
                            error="wrong"
                            success="right"
                            value="1"
                            onChange={this.onChange} 
                          />
                          <MDBInput
                            name="women"
                            icon="venus"
                            label="여성"
                            type="checkbox"
                            validate
                            error="wrong"
                            success="right"
                            value="2"
                            onChange={this.onChange} 
                          />
                        </div>
                        
                        <div style={left}>
                          <MDBInput
                            name="name"
                            label="이름"
                            icon="user"
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            onChange={this.onChange}  
                          />
                        </div>
                        
                        <div className="mb-3" style={left}>
                        <MDBIcon icon="birthday-cake fa-2x " /><span className="mr-3 ml-3">생일</span>
                        <DayPickerInput
                          onDayChange={day => {this.onDayChange(day,"birthday")}} 
                          />
                        </div>
                        <div className="mb-3" style={left}>
                        <MDBIcon icon="heart fa-2x " /><span className="mr-3 ml-3">처음 만난날</span>
                        <DayPickerInput
                          onDayChange={day => {this.onDayChange(day,"relday")}} 
                          />
                        </div>
                        <MDBBtn color="danger" onClick={this.backTosecond}>Back</MDBBtn>
                        <MDBBtn type="submit" color="primary">Start</MDBBtn>
                      </form>
                    </MDBCardBody>
                    <MDBFooter>
                      <p className="green-text">
                        <MDBIcon icon="quote-left" className="pr-2" />
                        한 마디도 놓치고 싶지 않은 목소리,<br></br>You&Me에서 선명한 무료 통화를 이용하세요.
                        <MDBIcon icon="quote-right" className="pl-2" />
                      </p>
                    </MDBFooter>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              </section>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default Third;  