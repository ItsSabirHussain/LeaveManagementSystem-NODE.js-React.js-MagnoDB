const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateProManLogin(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.ID = !isEmpty(data.ID) ? data.ID : "";
  data.Key = !isEmpty(data.Key) ? data.Key : "";
  // ID checks
  if (Validator.isEmpty(data.ID)) {
    errors.ID = "ID field is required";
  }
  // Key checks
  if (Validator.isEmpty(data.Key)) {
    errors.Key = "Key field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
