const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v) && v.length >= 8;
      },
      message: props => `${props.value} is not a valid phone number! Number must be:
- At least 8 characters long
- Two parts separated by hyphen
- First part: 2-3 digits
- Second part: remaining digits
Examples: 09-1234556 or 040-22334455`
    }
  }
});

module.exports = mongoose.model('Person', personSchema);
