// we have installed the "npm install mongoose --save"
// we have installed this too "npm I validator"
const mongoose = require('mongoose');
const validator = require('validator');
const { hashCompare } = require('./auth');


let userSchema = new mongoose.Schema({
  username: { type: 'string', required: true },
  email: {
    type: 'string',
    required: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    },
    unique: true
  },
  password: {
      type: String,
      required: true,
      validate: (value) => validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }),
   },

  // password: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: function (value) {
  //       return validator.isStrongPassword(value, {
  //         minLength: 8,
  //         minLowercase: 1,
  //         minUppercase: 1,
  //         minNumbers: 1,
  //         minSymbols: 1,
  //       });
  //     },
  //     message: 'Password should be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
  //   }
  // },

    createdAt: { type: Date, default: Date.now }
})


const usersModel = mongoose.model('users', userSchema)
module.exports = { usersModel, mongoose }