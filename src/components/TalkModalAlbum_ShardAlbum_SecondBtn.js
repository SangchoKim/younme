import React from 'react';
import {MDBBtn} from 'mdbreact';

const TalkModalAlbum_ShardAlbum_SecondBtn = (props) => {

    return (
        <React.Fragment>
            <div className="text-center">
                <MDBBtn name="back" color="danger" onClick={props.onClick}>뒤로</MDBBtn>
            </div>
        </React.Fragment>
    )
}
export default TalkModalAlbum_ShardAlbum_SecondBtn;
