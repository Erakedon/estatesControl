const Validators = {
    notNegative: {
        errorMessage: "can't be negative",
        validate(value) { return value >= 0 },
    },
    notBlank: {
        errorMessage: "must be specified",
        validate(value) {return value || false}
    }
}

export default Validators;