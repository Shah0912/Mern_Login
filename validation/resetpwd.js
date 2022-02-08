const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateResetPasswordInput(data) {
    let errors = {};

    data.newPass = !isEmpty(data.newPass) ? data.newPass : "";

    if (Validator.isEmpty(data.newPass)) {
        errors.newPass = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}