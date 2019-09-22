import React, { Component } from 'react';
import axios from 'axios';
import EstateBlock from '../../Shared/EstateBlock/EstateBlock';

class MainPage extends Component {
    state = { 
        estates: []
     }

    componentDidMount() {
        this.getAllEstatesData();
    }

    getAllEstatesData() {
        const url = "https://alfa.propertygrouppoland.pl/q/maciejbernacki/getAll";
        axios.get(url)
            .then(res => {
                this.setState({estates: res.data.data});
            },err => {
                this.props.reportActivity("loadingError");    
            });
    }

    deleteEstate(id) {
        const url = "https://alfa.propertygrouppoland.pl/q/maciejbernacki/delete/" + id;
        axios.get(url)
            .then(res => {
                this.getAllEstatesData();
                this.props.reportActivity("delete");
            },err => {                
                this.props.reportActivity("deleteError");                
            });
    }

    goToEditEstate(id) {
        this.props.history.push("/edit/" + id);
    }

    goToEstateView(id) {
        this.props.history.push("/view/" + id);
    }

    render() {
        let estateBlocks = [];
        this.state.estates.forEach((estate,i) => {
            estateBlocks.push(
            <EstateBlock 
            data={estate} 
            key={i}
            id={i+1}
            viewEstateHandler={() => {this.goToEstateView(estate.id)}}
            editEstateHandler={() => {this.goToEditEstate(estate.id)}}
            deleteHandler={() => {this.deleteEstate(estate.id)}}
             />
            );
        });

        return ( 
            <div className="MainPage page">
                <div className="title">Estates list</div>
                <div className="estateBoxesContainer">
                    {estateBlocks}
                </div>
            </div>
         );
    }
}
 
export default MainPage;