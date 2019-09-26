import React, { PureComponent } from 'react';
import {MDBBtn,MDBModal,MDBModalBody,MDBModalFooter} from 'mdbreact';

import AlbumModalMenu from './Album_modal_menu';
import AlbumModalAlbum from './Album_modal_album';
import AlbumModalCamera from './Album_modal_camera';
import AlbumModalPicture from './Album_modal_picture';
import AlbumModalAlbumBtn from './Album_modal_albumBtn';
import AlbumModalCameraFirstBtn from './Album_modal_cameraFirstBtn';
import AlbumModalCameraSecondBtn from './Album_modal_cameraSecondBtn';
class Album_modal extends PureComponent{

    render(){
        
        return(
            <React.Fragment>
                <div>  
                  <MDBModal isOpen={this.props.modal8} toggle={this.props.toggle8(8)} fullHeight position="top">            
                     <form onSubmit={this.props.setData}>
                     <MDBModalBody>
                     {!this.props.show &&
                       <AlbumModalMenu
                          modal = {this.props.modal}
                          onClick = {this.props.onClick}
                       />
                      }
                      {this.props.show && this.props.setting==='album'&&
                        <AlbumModalAlbum
                        onChangePhoto = {this.props.onChangePhoto}
                        file ={this.props.file}
                        /> 
                       }
                       {(this.props.show && this.props.setting==='camera') && !this.props.imageData 
                          &&
                          <AlbumModalCamera
                            setRef = {this.props.setRef} 
                            imageName = {this.props.imageName}
                            onChangeCamera = {this.props.onChangeCamera}
                          />
                        }
                      {this.props.imageData && this.props.show && this.props.setting==='camera' &&
                        <AlbumModalPicture
                        imageData = {this.props.imageData}
                        imageName = {this.props.imageName}
                        />
                        }                      
                     </MDBModalBody>
                     <MDBModalFooter>
                        {this.props.show && this.props.setting==='album' &&
                          <AlbumModalAlbumBtn
                          onClick ={this.props.onClick}
                          />
                        }
                        {this.props.show && this.props.setting==='camera' && !this.props.imageData &&
                          <AlbumModalCameraFirstBtn
                          onClick ={this.props.onClick}
                          capture ={this.props.capture}
                          />
                        }
                        {this.props.imageData && this.props.show && this.props.setting==='camera' &&
                          <AlbumModalCameraSecondBtn
                          onClickRetake = {this.props.onClickRetake}
                          />  
                        }
                        <MDBBtn color="secondary" onClick={this.props.toggle8(8)}>닫기</MDBBtn>
                      </MDBModalFooter>
                      </form>
                   </MDBModal>
                 </div>    
            </React.Fragment>
        )
    }


}

export default Album_modal;