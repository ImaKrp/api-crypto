const handleFields = (errors, edit = false) =>
  errors.length === 1
    ? `${edit ? "Some f" : "F"}ield is required: ${errors[0]}`
    : `${edit ? "Some f" : "F"}ield${
        edit ? " is" : "s are"
      } required: ${errors.join(", ")}`;

module.exports.handleFields = handleFields;
