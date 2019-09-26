import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import DataPickers from '../lib/DataPicker'
class Calendar_Body extends PureComponent {

    render() {
        return (
            <React.Fragment>
                <div className="text-center mt-3">
                    <DataPickers mode={this.props.mode} modal={this.props.modal} t={this.props.t}/>
                </div>
            </React.Fragment>
        )
    }
}

// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state) => (
    {title: state.Calendar.Title.title, data: state.Calendar.data}
);

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar_Body);