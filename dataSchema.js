const mongoose = require('mongoose');
const validator = require('validator');

let dataSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    },
    unique: true
  },
  mobile: {
    type: String,
    minLength: [10, "no should have minimum 10 digits"],
    maxLength: [10, "no should have maximum 10 digits"],
    match: [/\d{10}/, "no should only have digits"]
  },
  createdAt: { type: Date, default: Date.now }
});

const dataModel = mongoose.model('datas', dataSchema);
module.exports = { dataModel, mongoose };
