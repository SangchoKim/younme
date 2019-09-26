import React from 'react';
import {MDBCol,MDBListGroupItem,MDBRow} from 'mdbreact';
import Lottie from 'lottie-react-web';
import {Player} from 'video-react';
import animation1 from '../lotties/159-servishero-loading.json';
import animation2 from '../lotties/128-around-the-world.json';
import animation3 from '../lotties/8134-dont-worry-be-happy.json';
import animation4 from '../lotties/8144-battery-low-humour-animation.json';
import moment from 'moment';

const round = {
  backgroundColor: "black",
  borderRadius: "10%",
  padding:3
 }

const TalkBodyDataMap = (props) => {

    return(
      <React.Fragment>
        {props.length>0?
                  props.log.map(data => {
                    let paths = null;
                    if(data.gif&&data.gif[0].gifname){
                      console.log("data.gif[0].gifname",data.gif[0].gifname);
                      if(data.gif[0].gifname==="annimation1"){
                        paths = animation1;
                      }else if(data.gif[0].gifname==="annimation2"){
                        paths = animation2;
                      }else if(data.gif[0].gifname==="annimation3"){
                        paths = animation3;
                      }else if(data.gif[0].gifname==="annimation4"){
                        paths = animation4;
                      }
                    }
                    return(
                    data.sender===props.email? 
                    <MDBListGroupItem  key={data._id+'_'+data.cratedAt} className="text-right">
                          <MDBRow>
                            <MDBCol md="8"></MDBCol>
                            <MDBCol md="4" style={round} className="light-green">
                              <div style={{fontSize:15}} className="text-left m-2">
                                <p>{props.name}</p>
                              </div>
                              <div className="text-left ml-2">
                                {data.comment&&<p>{data.comment}</p>}
                                {data.gif&&data.gif[0].filename&&<img src={`/uploadsChat/${data.gif[0].filename}`}
                                alt="Logo" width="100%" height="" className="img-fluid z-depth-1 p-2"/>}
                                {data.gif&&data.gif[0].gifname&&
                                                                <Lottie
                                                                options={{
                                                                  animationData:paths,
                                                                  loop: true,
                                                                  autoplay: true,
                                                                }}
                                                              />}
                                {data.gif&&data.gif[0].videoName&&
                                                                <Player
                                                                playsInline
                                                                src={`/uploadsVideoChat/${data.gif[0].videoName}`}
                                                                />
                                }
                                {data.gif&&data.gif.length>=2&&
                                  data.gif.map((img,index) => {
                                    return(
                                          <MDBCol md="12" key={img.imageName+index+Date()}>
                                            <img src={img.imagePath}
                                            alt="Logo" width="100%" height="" className="img-fluid z-depth-1 p-2"/>
                                          </MDBCol>
                                          )
                                })
                                }
                                {data.gif&&data.gif[0].imagePath&&data.gif.length===1&&
                                  <img src={data.gif[0].imagePath}
                                  alt="Logo" width="100%" height="" className="img-fluid z-depth-1 p-2"/>
                                }
                                {data.gif&&data.gif[0].voiceRecordname&&
                                    <div className="text-center">
                                      <audio controls style={{width:'250px'}}
                                        src={`/uploadsVoiceRecodeChat/${data.gif[0].voiceRecordname}`}
                                      />
                                    </div>
                                }
                              </div>
                              <div style={{fontSize:10}} className="text-right mr-2">
                                <p>{moment(data.cratedAt).format("YYYY-MM-DD, hh:mm a")}</p>
                              </div>
                            </MDBCol>
                          </MDBRow> 
                    </MDBListGroupItem>
                    :
                    <MDBListGroupItem  key={data._id+'_'+data.cratedAt} className="text-left">
                          <MDBRow>
                            <MDBCol md="4" style={round} className="light-blue">
                              <div style={{fontSize:15}} className="text-left m-2">
                                <p>{props.oppentName}</p>
                              </div>
                              <div className="text-left ml-2">
                                {data.comment&&<p>{data.comment}</p>}
                                {data.gif&&data.gif[0].filename&&<img src={`/uploadsChat/${data.gif[0].filename}`}
                                alt="Logo" width="100%" height="" className="img-fluid z-depth-1 p-2"/>}
                                {data.gif&&data.gif[0].gifname&&<Lottie
                                                                options={{
                                                                  animationData:paths,
                                                                  loop: true,
                                                                  autoplay: true,
                                                                }}
                                                              />}
                                {data.gif&&data.gif[0].videoName&&
                                                                <Player
                                                                playsInline
                                                                src={`/uploadsVideoChat/${data.gif[0].videoName}`}
                                                                />
                                }
                                {data.gif&&data.gif.length>=2&&
                                  data.gif.map((img,index) => {
                                    return(
                                          <MDBCol md="12" key={img.imageName+index+Date()}>
                                            <img src={img.imagePath}
                                            alt="Logo" width="100%" height="" className="img-fluid z-depth-1 p-2"/>
                                          </MDBCol>
                                          )
                                })
                                }
                                {data.gif&&data.gif[0].imagePath&&data.gif.length===1&&
                                  <img src={data.gif[0].imagePath}
                                  alt="Logo" width="100%" height="" className="img-fluid z-depth-1 p-2"/>
                                }
                                {data.gif&&data.gif[0].voiceRecordname&&
                                  <div className="text-center">
                                    <audio controls style={{width:'250px'}}
                                      src={`/uploadsVoiceRecodeChat/${data.gif[0].voiceRecordname}`}
                                    />
                                  </div>
                                }
                              </div>
                              <div style={{fontSize:10}} className="text-right mr-2">
                                <p>{moment(data.cratedAt).format("YYYY-MM-DD, hh:mm a")}</p>
                              </div>
                            </MDBCol>
                            <MDBCol md="8"></MDBCol>
                          </MDBRow> 
                    </MDBListGroupItem>
                  )}
                  )
                  :
                  <div>대화내용이 없습니다.</div>
                }
      </React.Fragment>
    )
}
export default TalkBodyDataMap;

