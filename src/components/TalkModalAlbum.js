import React, { PureComponent } from 'react';
import {MDBRow,MDBCol} from 'mdbreact';
import TalkModalAlbumShardAlbum from './TalkModalAlbum_ShardAlbum';
import TalkModalAlbumShardAlbumChoice from './TalkModalAlbum_ShardAlbum_Choice';
import TalkModalAlbumShardAlbumFirstBtn from './TalkModalAlbum_ShardAlbum_FirstBtn';
import TalkModalAlbumShardAlbumSecondBtn from './TalkModalAlbum_ShardAlbum_SecondBtn';
class TalkModalAlbum extends PureComponent{

    render(){
        return(
            <React.Fragment>
              <form onSubmit={this.props.setAlbumData}>
                <MDBRow>
                  <MDBCol md="12" >
                      <div className="text-center m-1">
                        <h3>공유 앨범</h3>
                      </div>
                      <hr color="#000000" />
                  </MDBCol>
                  <TalkModalAlbumShardAlbum
                    imgUrls = {this.props.imgUrls}
                    onAlbumChoice = {this.props.onAlbumChoice}
                  /> 
                    {this.props.isChoice&&this.props.albumFile&&
                    <MDBRow>
                      {this.props.albumFile.length>=1&&
                        <MDBCol md="12">
                          <hr color="black" width="100%"></hr>
                            <div className="text-center">
                              <h3>선택한 사진</h3>
                            </div>
                        </MDBCol>
                      }
                      <TalkModalAlbumShardAlbumChoice
                        albumFile = {this.props.albumFile}
                        onAlbumChoice = {this.props.onAlbumChoice}
                      />
                     
                      {this.props.albumFile.length>=1&&
                        <TalkModalAlbumShardAlbumFirstBtn
                          onClick = {this.props.onClick}
                        />
                      }
                      </MDBRow>
                    }
                  </MDBRow>
                  {this.props.albumFile.length===0&&
                    <TalkModalAlbumShardAlbumSecondBtn
                      onClick = {this.props.onClick}
                    />
                  } 
                </form>  
          </React.Fragment>
        )
    }
}

export default TalkModalAlbum;