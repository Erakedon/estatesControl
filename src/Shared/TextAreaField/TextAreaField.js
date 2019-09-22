import React from 'react';

const TextAreaField = props => {
    return ( 
        <div className={"TextAreaField " + props.status}>
            <label>{props.name}</label>
            <textarea   
                rows="4"
                value={props.value}
                onChange={({target: {value}}) => {props.onChangeHandler(props.type === "number" ? value * 1 : value)}}
                onBlur={({target: {value}}) => {props.onBlurHandler(value)}}/>
        </div>
     );
}
 
export default TextAreaField;