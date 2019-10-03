import React from 'react';


const Calendar_dataInfo_Category = (props) => {
    return(
      <React.Fragment>
        <div className="black-text">
            <select id="select" className="browser-default custom-select" name="category" onChange={props.onchange}>
                <option>유형 선택</option>
                {
                props.category===1?<option selected id="date" value="1">데이트</option>
                :
                <option id="date" value="1">데이트</option>
                }
                {
                props.category===2?
                <option selected id="trop" value="2">여행</option>
                :
                <option id="trop" value="2">여행</option>
                }
                {
                props.category===3?
                <option selected id="culture" value="3">문화생활</option>
                :
                <option id="culture" value="3">문화생활</option>
                }
                {
                props.category===4?
                <option selected id="school" value="4">학교</option>
                :
                <option id="school" value="4">학교</option>
                }
                {
                  props.category===5?
                  <option selected id="task" value="5">업무</option> 
                  :
                  <option id="task" value="5">업무</option>   
                }
                {
                props.category===6?
                <option selected id="person" value="6">개인</option>
                :
                <option id="person" value="6">개인</option>    
                }
            </select>
        </div> 
      </React.Fragment>
    )
}
export default Calendar_dataInfo_Category;

