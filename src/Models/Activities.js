import React from 'react';

const Activities = {
    add: {
        icon: (<i className="fas fa-plus-circle" key="add" />),
        info: "Estate added"
    },
    edit: {
        icon: (<i className="fas fa-edit" key="edit" />),
        info: "Estate edited"
    },
    delete: {
        icon: (<i className="fas fa-trash-alt" key="delete" />),
        info: "Estate removed"
    },
    deleteAll: {
        icon: (<i className="fas fa-trash-alt" key="deleteAll" />),
        info: "All estates removed"
    },
    addError: {
        icon: (<i className="fas fa-exclamation-triangle" key="addError" />),
        info: "Estate couldn't be added, please try again later"
    },
    editError: {
        icon: (<i className="fas fa-exclamation-triangle" key="editError" />),
        info: "Estate couldn't be edited, please try again later"
    },
    deleteError: {
        icon: (<i className="fas fa-exclamation-triangle" key="deleteError" />),
        info: "Estate couldn't be removed, please try again later"
    },
    deleteAllError: {
        icon: (<i className="fas fa-exclamation-triangle" key="deleteAllError" />),
        info: "Estates couldn't be removed, please try again later"
    },
    loadingError: {
        icon: (<i className="fas fa-exclamation-triangle" key="loadingError" />),
        info: "Error on loading data"
    },
}

export default Activities;