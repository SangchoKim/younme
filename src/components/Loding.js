import React from 'react';
import Lottie from 'lottie-react-web';
import Lodings from '../lotties/61-octopus.json';

const Loding = (props) => {

    return (
        <React.Fragment>
            <Lottie
                options={{
                    animationData: Lodings,
                    loop: true,
                    autoplay: true
                }}/>
            <div className="col-12 text-center">
              <h1><strong>로딩중입니다.....</strong></h1>
            </div>
        </React.Fragment>
    )
}
export default Loding;
