const handleFields = (errors) =>
  errors.length === 1
    ? `Field is required: ${errors[0]}`
    : `Fields are required: ${errors.join(", ")}`;

module.exports.handleFields = handleFields;
