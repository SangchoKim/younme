import React from 'react';
import {MDBBtn, MDBCol, MDBIcon, MDBCard} from 'mdbreact';

const TalkModalAlbum_ShardAlbum_Choice = (props) => {

    return (
        <React.Fragment>
            {
                props
                    .albumFile
                    .map((data, index) => {
                        return (
                            <MDBCol md="2" key={data + index + Date()}>
                                <div className="text-center mt-3 view overlay">
                                    <MDBCard>
                                        <img src={data.imagePath} alt='' width="500" height="auto"></img>
                                        <div className="mask flex-center rgba-green-slight">
                                            <MDBBtn
                                                id={data.imagePath}
                                                name='unselected'
                                                color="default"
                                                size="sm"
                                                className=""
                                                onClick={props.onAlbumChoice}><MDBIcon icon="check fa-2x"/>
                                                <br></br>취소</MDBBtn>
                                        </div>
                                    </MDBCard>
                                </div>
                            </MDBCol>
                        )
                    })
            }
        </React.Fragment>
    )
}
export default TalkModalAlbum_ShardAlbum_Choice;
