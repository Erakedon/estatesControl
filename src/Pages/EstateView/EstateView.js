import React, { Component } from 'react';
import axios from 'axios';
import EstateModel from './../../Models/EstateModel';

class EstateView extends Component {
    state = {  }

    componentDidMount() {
        this.getEstateData();
    }

    getEstateData() {
        const id = this.props.location.pathname.split("/").slice(-1)[0];
        const url = "https://alfa.propertygrouppoland.pl/q/maciejbernacki/get/" + id; 
        axios.get(url)
            .then(res => {
                this.setState({estateData: res.data.data});
            },err => {                
                this.props.reportActivity("loadingError");    
            });
    }

    render() { 
        let estateDataToRender = [];

        if(this.state.estateData)
            EstateModel.forEach(el => {
                estateDataToRender.push(
                    <div className={"data " + el.name} key={el.name}>
                        <div className="name">{el.displayName}</div>
                        <div className="value">{this.state.estateData[el.name]}</div>
                    </div>
                );
            });

        return ( 
            <div className="EstateView page">
                <div className="estateDataContainer">
                    {estateDataToRender}
                </div>
            </div>
         );
    }
}
 
export default EstateView;