import React, {PureComponent} from 'react'; 
import'./App.css';
  
class MyComponent extends PureComponent {

    state={
      first:"썸이 끝났다.",
      second:"연애의 시작, You&Me", 
      third:"지금 연애하고 계신가요?", 
      forth:"You&Me를 시작하세요! ",
      fifth:"You&Me는 연인과 더 사랑스럽게 소통하고, 소중한 추억을 ",
      sixth:"손쉽게 저장할 수 있는 어플입니다."
    }

    render() {
        const font = {
          fontFamily:"a다정다감"
        }

        return(
          <React.Fragment>
          <nav>
            <h2 style={font} className="_logoImage">You&Me</h2>
          </nav>
            <div className="flex-container">
              <div>
                <h1 style={font}>{this.state.first}</h1>
                <h2 style={font}>{this.state.second}</h2>
                <p style={font}>{this.state.third}</p>
                <p style={font}>{this.state.forth}</p>
                <p style={font}>{this.state.fifth}</p>
                <p style={font}>{this.state.sixth}</p>
              </div>
              <div> 
                <img src="https://dtqvguqpjeirn.cloudfront.net/static/img/5.0/feature/main_1_home-assets/main_1_home_ko@3x.png" alt="dfdfdfdf" className="_mainImage"></img>
              </div>    
            </div>
          </React.Fragment>
        );
    }
}

export default MyComponent;

