import React, { Component } from 'react';
import FormField from '../../Shared/FormField/FormField';
import axios from 'axios';
import EstateModel from './../../Models/EstateModel';
import Validators from './../../Models/Validators';
import TextAreaField from './../../Shared/TextAreaField/TextAreaField';

class EditEstate extends Component {
    state = { 
        errors: {},
        formStatus: {}
     }

     constructor(props) {
         super(props);
         EstateModel.forEach(el => {
             // eslint-disable-next-line
             this.state.errors[el.name] = [];
             // eslint-disable-next-line
             this.state.formStatus[el.name] = "untouched";
         });
     }

     componentDidMount() {
        this.getEstateData();
     }
     
    getEstateData() {
        const id = this.props.location.pathname.split("/").slice(-1)[0];
        const url = "https://alfa.propertygrouppoland.pl/q/maciejbernacki/get/" + id; 
        axios.get(url)
            .then(res => {
                let formValues = {};
                EstateModel.forEach(el => {
                    formValues[el.name] = res.data.data[el.name];
                });
                this.setState({form: formValues});
            },err => {                
                this.props.reportActivity("loadingError");
            });
    }

     createNewEstate(newEstateData) {
        const id = this.props.location.pathname.split("/").slice(-1)[0];
        const url = "https://alfa.propertygrouppoland.pl/q/maciejbernacki/update/" + id;

        const dataToSent = JSON.stringify(newEstateData);

        axios({
            method: 'post',
            url: url,
            'Content-Type': 'application/json',
            dataType: 'json',
            data: dataToSent,
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        }).then(res => {
            this.props.history.goBack();
            this.props.reportActivity("edit");
        },err => {
            this.props.reportActivity("editError");
        });
     }

    onFieldChange(value, field) {
        let newFormValues = this.state.form;
        newFormValues[field] = value;
        this.setState({form: newFormValues});
    }

    onFieldBlur(value, field) {
        this.validateField(value, field);
    }

    validateField(value, field) {
        let errorMessages = [];

        EstateModel.find(el => {
            return el.name === field;
        }).validators.forEach(validatorName => {
            const validator = Validators[validatorName];
            if(!validator.validate(value)) errorMessages.push(validator.errorMessage);
        });

        let newErrorState = this.state.errors;
        newErrorState[field] = errorMessages;
        
        let newFormStatusState = this.state.formStatus;
        newFormStatusState[field] = errorMessages.length > 0 ? "error" : "validated";

        this.setState({
            errors: newErrorState,
            formStatus: newFormStatusState
        });
        return errorMessages.length === 0;
    }

    submitForm() {
        let noErrors = true;

        EstateModel.forEach(el => {
            if(!this.validateField(this.state.form[el.name], el.name)) noErrors = false;
        });
        
        if(noErrors) this.createNewEstate(this.state.form);
    }

    render() { 

        let formFields = [];
        if(this.state.form)
            EstateModel.forEach(el => {
                if(el.type === "textarea")
                formFields.push(
                    <TextAreaField
                        name={el.displayName}
                        key={el.name}
                        type="textarea"
                        value={this.state.form[el.name]}
                        errorMessages={this.state.errors[el.name]}
                        status={this.state.formStatus[el.name]}
                        onChangeHandler={value => {this.onFieldChange(value,el.name)}}
                        onBlurHandler={value => {this.onFieldBlur(value,el.name)}}
                    />
                );
                else
                    formFields.push(
                        <FormField 
                            name={el.displayName}
                            key={el.name}
                            type={el.type}
                            value={this.state.form[el.name]}
                            errorMessages={this.state.errors[el.name]}
                            status={this.state.formStatus[el.name]}
                            onChangeHandler={value => {this.onFieldChange(value,el.name)}}
                            onBlurHandler={value => {this.onFieldBlur(value,el.name)}}
                        />
                    );
            });

        return ( 
            <div className="EditEstate page">
                <div className="title">Edit estate</div>
                <div className="form">
                    {formFields}
                    <div className="buttonsBox">
                        <button className="blue" onClick={() => {this.submitForm()}}>Edit</button>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default EditEstate;