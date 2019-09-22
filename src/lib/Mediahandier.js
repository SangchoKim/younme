const constraints = {
    width: 1280,
    height: 720,
    frameRate: 10, //mobile
    facingMode: {
        exact: "environment"
    } //mobile
}

export default class Mediahandier {

    
    getPermissions(){
        return new Promise((resolve, rej) => {
            navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
                                                  navigator.mediaDevices.webkitGetUserMedia ||
                                                  navigator.mediaDevices.mozGetUserMedia;

            navigator.mediaDevices.getUserMedia({video:true, audio:true})
            .then((stream) =>{
                resolve(stream);
            })
            .catch(err => {
                navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
                                                  navigator.mediaDevices.webkitGetUserMedia ||
                                                  navigator.mediaDevices.mozGetUserMedia;
                console.log(`Unable to fetch stream ${err}`);
                navigator.mediaDevices.getUserMedia({video:constraints, audio:true})
                .then((stream) =>{
                
                    resolve(stream);
                })
            })
        })
    }
}