import React from 'react';
import {MDBBtn, MDBCol, MDBIcon} from 'mdbreact';

const TalkModalAlbum_ShardAlbum = (props) => {

    return (
        <React.Fragment>
            {
                props
                    .imgUrls
                    .map((image, index) => {
                        return (
                            <MDBCol md="2" key={image + index + Date()}>
                                <div className="view overlay">
                                    <img
                                        src={`/uploadsAlbum/${image}`}
                                        onClick={() => this.setState({isOpen: true})}
                                        alt="Logo"
                                        width="100%"
                                        height=""
                                        className="img-fluid z-depth-1 p-2"/>
                                    <div className="mask flex-center rgba-green-slight">
                                        <MDBBtn
                                            id={`/uploadsAlbum/${image}`}
                                            name={image}
                                            color="primary"
                                            size="sm"
                                            className=""
                                            onClick={props.onAlbumChoice}><MDBIcon icon="check fa-2x"/>
                                            <br></br>선택</MDBBtn>
                                    </div>
                                </div>
                            </MDBCol>
                        )
                    })
            }
        </React.Fragment>
    )
}
export default TalkModalAlbum_ShardAlbum;
