import React from 'react';
import { Switch,Route } from 'react-router-dom';
import { Add } from '../pages';
import { First } from '../pages';
import { Second } from '../pages';
import { Third } from '../pages';
import { Main } from '../pages';
import {MemorialDay} from '../pages';
import { Talk } from '../pages';
import { Alert } from '../pages';
import { Album } from '../pages';
import { Mypage } from '../pages';
import { Calendar } from '../pages';
import { Loading } from '../pages';
import SocketIo from 'socket.io-client';
const socket_Alert = SocketIo.connect(`http://localhost:5000/alert`);




class App extends React.Component {

    componentDidMount(){
        socket_Alert.on('connect',()=>{
            console.log('client-Alert_Sokect 접속 됨'); 
         });

         socket_Alert.on('Alert_send', async(data) => { // 서버로부터 photo 파일 들어옴
            console.log('AlertFromServer',data);
            const WALLPAPER = 1;
            const SHAREDALBUM = 2;
            const CALENDER = 3;
            const CHAT = 4;

            const INSERT = 1;
            const UPDATE = 2;
            const DELETE = 3;
            if(await data){
                const {_code,number,crud,name,oppentName,cratedAt} = data;
                let notification = null;
                if(await WALLPAPER===parseInt(number)){
                    notification = `${name}님이 배경화면을 추가하였습니다.`
                  }else if( await SHAREDALBUM===parseInt(number)){
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
                  }else if( await CALENDER===parseInt(number)){
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
                  }else if( await CHAT===parseInt(number)){
                    notification = `${name}님이 ${oppentName}님께 글을 남겼습니다.`
                  }else{
                    notification = `에러가 발생하였습니다.`
                  }
                  await alert(notification);
            }
          })   
    }

    render() {
        return (
                <Switch>>
                    <Route exact path="/" component={Add}/>
                    <Route path="/first" component={First}/>
                    <Route path="/second" component={Second}/>
                    <Route path="/third" component={Third}/>
                    <Route path="/loading" component={Loading}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/memorialday" component={MemorialDay}/>
                    <Route path="/talk" component={Talk}/>
                    <Route path="/alert" component={Alert}/>
                    <Route path="/album" component={Album}/>
                    <Route path="/mypage" component={Mypage}/>
                    <Route path="/calendar" component={Calendar}/>
                </Switch>
            
        );
    }
}
export default App;
