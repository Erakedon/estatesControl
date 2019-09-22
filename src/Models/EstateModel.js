const EstateModel = [
    {
        name: "city",
        displayName: "City",
        type: "text",
        validators: ["notBlank"]
    },
    {
        name: "street",
        displayName: "Street",
        type: "text",
        validators: ["notBlank"]
    },
    {
        name: "property",
        displayName: "Property",
        type: "text",
        validators: ["notBlank"]
    },
    {
        name: "apartment",
        displayName: "Apartment",
        type: "text",        
        validators: []
    },
    {
        name: "price",
        displayName: "Price",
        type: "number",
        validators: ["notNegative","notBlank"]
    },
    {
        name: "type",
        displayName: "Type",
        type: "number",
        validators: ["notNegative","notBlank"]
    },
    {
        name: "description",
        displayName: "Description",
        type: "textarea",        
        validators: []
    }
]

export default EstateModel;