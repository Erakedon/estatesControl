import React, { Component } from 'react';
import axios from 'axios';

class FloatingToolbox extends Component {
    state = { 
        confirmationMessage: false
     }

    toolsOnPages = {
        mainPage: ["add", "deleteAll"],
        add: ["back"],
        view: ["back", "edit", "delete"],
        edit: ["back"],
    }

    tools = {
        add: (
        <div className="tool add" key="add" onClick={() => {this.goToPage("/add")}}>
            <i className="fas fa-plus-circle"></i>
            <div className="name">Add estate</div>
        </div>
        ),
        back: (
        <div className="tool back" key="back" onClick={() => {this.props.history.goBack()}}>
            <i className="far fa-arrow-alt-circle-left"></i>
            <div className="name">Back</div>
        </div>
        ),
        edit: (
        <div className="tool edit" key="edit" onClick={() => {this.goToPage("/edit/" + this.getCurrentEstateId())}}>
            <i className="fas fa-edit"></i>
            <div className="name">Edit</div>
        </div>
        ),
        delete: (
        <div className="tool delete" key="delete" onClick={() => {this.deleteEstate()}}>
            <i className="fas fa-trash-alt"></i>
            <div className="name">Delete</div>
        </div>
        ),
        deleteAll: (
        <div className={"tool deleteAll" + (this.state.confirmationMessage ? " active" : " active")} 
            key="deleteAll" onClick={() => {this.putConfirmationPanel()}}>
            <i className="fas fa-trash-alt"></i>
            <div className="name">Delete all</div>
        </div>
        ),
    }

    componentDidUpdate() {
        if(this.state.confirmationMessage && this.getCurrentPage() !== "mainPage") this.removeConfirmationPanel();
    }

    getCurrentEstateId() {
        return this.props.location.pathname.split("/").slice(-1)[0];
    }

    getCurrentPage() {
        return this.props.location.pathname.split("/")[1] || "mainPage";
    }

    deleteEstate() {
        const url = "https://alfa.propertygrouppoland.pl/q/maciejbernacki/delete/" + this.getCurrentEstateId();
        axios.get(url)
            .then(res => {
                this.props.reportActivity("delete");
                this.props.history.goBack();
            },err => {                
                this.props.reportActivity("deleteError");                
            });
    }

    deleteAllEstates() {
        this.removeConfirmationPanel();

        const url = "https://alfa.propertygrouppoland.pl/q/maciejbernacki/deleteAll";
        axios.get(url)
            .then(res => {
                //not very elegant solution, but i found it the best possible
                this.props.history.push("/add");
                this.props.history.push("/");
                
                this.props.reportActivity("deleteAll");
            },err => {                
                this.props.reportActivity("deleteAllError");                
            });
    }

    putConfirmationPanel() {
        this.setState({confirmationMessage: true});
    }

    removeConfirmationPanel() {
        this.setState({confirmationMessage: false});
    }
    
    goToPage(url) {
        this.props.history.push(url);
    }

    render() { 
        const page = this.getCurrentPage();
        let toolsToRender = [];

        this.toolsOnPages[page].forEach(el => {
            toolsToRender.push(this.tools[el]);
        });

        return ( 
            <div className="FloatingToolbox">
                {toolsToRender}
                {this.state.confirmationMessage ? (
                    <div className="confirmationPanel">
                        <div className="message">Are you sure?</div>
                        <button onClick={() => {this.removeConfirmationPanel()}}>cancel</button>
                        <button className="red" onClick={() => {this.deleteAllEstates()}}>delete all</button>
                    </div>) : ("")}
            </div>
         );
    }
}
 
export default FloatingToolbox;