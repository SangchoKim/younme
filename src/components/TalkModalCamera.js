import React, {PureComponent} from 'react';
import TalkModalCameraIsReady from './TalkModalCamera_isReady';
import TalkModalCameraSubmit from './TalkModalCamera_submit';
class TalkModalCamera extends PureComponent {

    render() {

        return (
            <React.Fragment>
                {
                    this.props.isReady && <TalkModalCameraIsReady
                            setRef={this.props.setRef}
                            imageName={this.props.imageName}
                            onChangeCamera={this.props.onChangeCamera}
                            onClick={this.props.onClick}
                            capture={this.props.capture}/>
                }
                {
                    this.props.isCapture && this.props.imageData && <TalkModalCameraSubmit
                            setCameraData={this.props.setCameraData}
                            imageData={this.props.imageData}
                            imageName={this.props.imageName}
                            onClickRetake={this.props.onClickRetake}/>
                }
            </React.Fragment>
        )
    }
}

export default TalkModalCamera;