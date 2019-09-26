import React, {PureComponent} from 'react';

class Calendar_category extends PureComponent {

    render() {
        return (
            <React.Fragment>
                <div className="black-text">
                    <select className="browser-default custom-select">
                        <option>유형 선택</option>
                        <option value="1">데이트</option>
                        <option value="2">여행</option>
                        <option value="3">문화생활</option>
                        <option value="4">학교</option>
                        <option value="5">업무</option>
                        <option value="6">개인</option>
                    </select>
                </div>
            </React.Fragment>
        )
    }

}

export default Calendar_category;