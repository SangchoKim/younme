import React, {PureComponent} from 'react';
import {
    MDBListGroup,
    MDBCol,
    MDBCard,
    MDBContainer,
    MDBRow,
    MDBListGroupItem,
    MDBIcon
} from 'mdbreact';
import moment from 'moment';
import { connect } from 'react-redux';  
import * as AlertAction from '../store/modules/Alert';
import Loding from '../components/Loding';

const font = {
    color: "black",
    fontWeight: "bold",
    fontSize: 17,
    fontFamily: "a다정다감"
}

const list1 = {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center'
}

class AlertBody extends PureComponent {


    componentDidMount() {
       const {getDataFromAlert} = this.props;
       getDataFromAlert();
    }

    componentWillUnmount(){
        const {alertOut} = this.props;
        alertOut();
      }

    
    render() {
        const {log,alertState} = this.props;
       
        const WALLPAPER = 1;
        const SHAREDALBUM = 2;
        const CALENDER = 3;
        const CHAT = 4;

        const INSERT = 1;
        const UPDATE = 2;
        const DELETE = 3;

        const alertInfo = log.map((data, index) => {
            const {number, crud, name, oppentName, cratedAt} = data;
            let notification = null;
            if (WALLPAPER === parseInt(number)) {
                notification = `${name}님이 배경화면을 추가하였습니다.`
            } else if (SHAREDALBUM === parseInt(number)) {
                let discription = null;
                switch (parseInt(crud)) {
                    case INSERT:
                        discription = '추가';
                        break;
                    case UPDATE:
                        discription = '수정';
                        break;
                    case DELETE:
                        discription = '삭제';
                        break;
                    default:
                        discription = '에러';
                        break;
                }
                notification = `${name}님이 공유앨범을 ${discription}하였습니다.`
            } else if (CALENDER === parseInt(number)) {
                let discription = null;
                switch (parseInt(crud)) {
                    case INSERT:
                        discription = '추가';
                        break;
                    case UPDATE:
                        discription = '수정';
                        break;
                    case DELETE:
                        discription = '삭제';
                        break;
                    default:
                        discription = '에러';
                        break;
                }
                notification = `${name}님이 캘린더을 ${discription}하였습니다.`
            } else if (CHAT === parseInt(number)) {
                notification = `${name}님이 ${oppentName}님께 글을 남겼습니다.`
            } else {
                notification = `에러가 발생하였습니다.`
            }

            return (
                <MDBListGroupItem style={list1} key={index + cratedAt}>
                    <div className="ml-2">
                        <MDBIcon className="mr-2" far="far" icon={this.props.leftIcon}/>{notification}
                    </div>
                    <div
                        style={{
                            fontSize: 10
                        }}
                        className="text-right mr-5">
                        <p>{moment(cratedAt).format("YYYY-MM-DD, hh:mm a")}</p>
                    </div>
                </MDBListGroupItem>
            )
        })

        return (
            <React.Fragment>
                {alertState==='isReady'&&
                <Loding 
                    comment={this.props.comment}
                />
                }
                {alertState==="isFail"&&
                <p>에러발생</p>
                }
                {alertState==='isSuccess'&&
                <React.Fragment> 
                <MDBContainer>
                    <MDBRow style={font}>
                        <MDBCol md="2"></MDBCol>
                        <MDBCol md="8">
                            <MDBCard className="mt-2">
                                {
                                    log.length >= 1
                                        ? <MDBListGroup className="border-dark text-center">
                                                {alertInfo}
                                            </MDBListGroup>
                                        : <div>
                                                <h3>알림이 없습니다.</h3>
                                            </div>
                                }
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </React.Fragment>
                }
            </React.Fragment>
        )
    }

}

    
const mapStateToProps = (state) => ({
    title: state.Alert.Title.title,
    back: state.Alert.Title.back,
    update: state.Alert.Title.update,  
    backUrl: state.Alert.Title.backUrl,
    updateUrl: state.Alert.Title.updateUrl,
    mainIcon: state.Alert.Title.icon.main,
    rightIcon: state.Alert.Title.icon.update,
    backIcon: state.Alert.Title.icon.back,
    mode: state.Alert.Title.mode.show,
    State: state.Alert.Body.alert.State,
    alertIcon: state.Alert.Body.alert.icon,
    log: state.Alert.log,
    alertState: state.Alert.alertState,
    comment: state.Alert.comment,
    errMessage: state.Alert.errMessage,
    result: state.Alert.result,
    defaultImage: state.Alert.defaultImage,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    getDataFromAlert: () => dispatch(AlertAction.getDataFromAlert()),
    alertOut: () => dispatch(AlertAction.alertOut()),
  })

export default connect(mapStateToProps, mapDispatchToProps)(AlertBody);