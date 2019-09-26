import React from 'react';
import {MDBBtn} from 'mdbreact';

const Main_body_footer_albumBtn = (props) => {

    return(
      <React.Fragment>
        <div>
          <MDBBtn name="back" color="danger" onClick={props.onClick}>뒤로</MDBBtn>
          <MDBBtn type="submit" name="submit" color="info" >변경</MDBBtn>
        </div>
      </React.Fragment>
    )
}
export default Main_body_footer_albumBtn;

