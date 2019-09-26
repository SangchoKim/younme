import React from 'react';
import {MDBBtn, MDBCol} from 'mdbreact';

const TalkModalAlbum_ShardAlbum_FirstBtn = (props) => {

    return (
        <React.Fragment>
            <MDBCol md="12">
                <div className="text-center">
                    <MDBBtn name="back" color="danger" onClick={props.onClick}>뒤로</MDBBtn>
                    <MDBBtn type="submit" name="submit" color="info">보내기</MDBBtn>
                </div>
            </MDBCol>
        </React.Fragment>
    )
}
export default TalkModalAlbum_ShardAlbum_FirstBtn;
