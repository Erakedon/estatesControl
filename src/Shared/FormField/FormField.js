import React from 'react';

const FormField = props => {

    let errorMessageDivs = [];
    props.errorMessages.forEach((message,i) => {
        errorMessageDivs.push(<div className="errorMessage" key={i} >{props.name + " " + message}</div>);
    });

    return ( 
        <div className={"FormField " + props.status}>
            <label>{props.name}</label>
            <input type={props.type} 
                name={props.name}
                value={props.value}
                onChange={({target: {value}}) => {props.onChangeHandler(props.type === "number" ? value * 1 : value)}}
                onBlur={({target: {value}}) => {props.onBlurHandler(value)}} />
            {errorMessageDivs}
        </div>
     );
}
 
export default FormField;