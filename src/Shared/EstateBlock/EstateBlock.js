import React from 'react';

const EstateBlock = props => {
    return ( 
        <div className="EstateBlock" onClick={() => {props.viewEstateHandler()}}>
            <div className="blockId">{props.id}</div>

            <div className="location">
                <span className="city">{props.data.city}</span>
                <span className="address">{props.data.street + " " + props.data.property + (props.data.apartment ? "/" + props.data.apartment : "")}</span>
            </div>

            <div className="price">{props.data.price + "PLN"}</div>     
            
            <div className="type">
                <span className="name">Type: </span>
                <span className="value">{props.data.type}</span>
            </div>

            <div className="icons" onClick={event => (event.stopPropagation())}>
                <i className="fas fa-edit" onClick={props.editEstateHandler} />
                <i className="fas fa-trash-alt" onClick={props.deleteHandler} />
            </div>
        </div>
     );
}
 
export default EstateBlock;