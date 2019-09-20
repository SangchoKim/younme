import React, { PureComponent } from 'react';
import {MDBListGroup,MDBCol,MDBCard,MDBContainer,MDBRow,MDBListGroupItem,MDBIcon} from 'mdbreact';
import defaultImage from '../img/default_alert.png';
import moment from 'moment';

const font = {
  color:"black",
  fontWeight:"bold",
  fontSize:17,
  fontFamily:"a다정다감"
}

const list1 = {
display: 'flex',
flexDirection: "row",
justifyContent: 'center',
}

class  AlertBody extends PureComponent{

  state = {
    log:[],
    defaultImage:null,
  }

  componentDidMount(){
    fetch(`/io/getAlert`,{method: "GET",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            }
                          })
    .then((res) => res.json())
    .then((res) => {
      console.log('알림 정보 확인', res.sendData);
      if(res.results===1){
        this.setState(prev=>({
          ...prev,
          log:res.sendData,
        }));
      }else{
        alert('등록된 알림이 없습니다.');
        this.setState(prev=>({
          ...prev,
          defaultImage:defaultImage,
        }));
      }
    })
  }

    render(){

      const {log} = this.state;

      const WALLPAPER = 1;
      const SHAREDALBUM = 2;
      const CALENDER = 3;
      const CHAT = 4;

      const INSERT = 1;
      const UPDATE = 2;
      const DELETE = 3;

      const alertInfo = log.map((data,index) => {
        const {_code,number,crud,name,oppentName,cratedAt} = data;
        let notification = null;
        if(WALLPAPER===parseInt(number)){
          notification = `${name}님이 배경화면을 추가하였습니다.`
        }else if(SHAREDALBUM===parseInt(number)){
          let discription = null;
          switch(parseInt(crud)){
            case INSERT: discription = '추가';
            break;
            case UPDATE: discription = '수정';
            break;
            case DELETE: discription = '삭제';
            break;
            default: discription = '에러';
            break;
          }
          notification = `${name}님이 공유앨범을 ${discription}하였습니다.`
        }else if(CALENDER===parseInt(number)){
          let discription = null;
          switch(parseInt(crud)){
            case INSERT: discription = '추가';
            break;
            case UPDATE: discription = '수정';
            break;
            case DELETE: discription = '삭제';
            break;
            default: discription = '에러';
            break;
          }
          notification = `${name}님이 캘린더을 ${discription}하였습니다.`
        }else if(CHAT===parseInt(number)){
          notification = `${name}님이 ${oppentName}님께 글을 남겼습니다.`
        }else{
          notification = `에러가 발생하였습니다.`
        }

        return(
              <MDBListGroupItem style={list1} key={index+cratedAt}>
                <div className="ml-2">
                  <MDBIcon className="mr-2" far icon={this.props.leftIcon}/>{notification}
                </div>
                <div style={{fontSize:10}} className="text-right mr-5">
                   <p>{moment(cratedAt).format("YYYY-MM-DD, hh:mm a")}</p>
                </div>
              </MDBListGroupItem>
              )
      })

        return(
            <React.Fragment>
              <MDBContainer>
                <MDBRow style={font}>
                  <MDBCol md="2" >
                  </MDBCol> 
                  <MDBCol md="8" >
                    <MDBCard className="mt-2" >
                      {log.length>=1?
                        <MDBListGroup className="border-dark text-center">
                          {alertInfo}
                        </MDBListGroup>
                        :
                        <div>
                          <h3>알림이 없습니다.</h3>
                        </div>
                      } 
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </React.Fragment>
        )
    }


}

export default AlertBody;