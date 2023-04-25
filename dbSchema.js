// we have installed the "npm install mongoose --save"
// we have installed this too "npm I validator"
const mongoose = require('mongoose');
const validator = require ('validator');

let userSchema = new mongoose.Schema({
    username:{type: 'string', required: true},
    email:{
        type:'string',
        required: true,
        lowercase: true,
        validate: (value)=>{
            return validator.isEmail(value)
        },
        unique: true
    },
    // password: {
    //     // type: String,
    //     // required: true,
    //     // validate: (value) => validator.isStrongPassword(value, {
    //     //     minLength: 8,
    //     //     minLowercase: 1,
    //     //     minUppercase: 1,
    //     //     minNumbers: 1,
    //     //     minSymbols: 1,
    //     //   }),
    //     // minlength: 8,
    //     // match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{8,}$/
    //     type: String,
    // required: true,
    // minlength: 8,
    // match: /^(?=.*\d).{8,}$/
    // }
    password: {
        type: String,
        required: true,
        validate: [
          {
            validator: (value) => validator.isStrongPassword(value),
            message: 'Password must be at least 8 characters and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol',
          },
          {
            validator: (value) => validator.isLength(value, { min: 8 }),
            message: 'Password must be at least 8 characters',
          },
        ],
      },
    createdAt:{type:Date, default:Date.now}
})

const usersModel = mongoose.model('users', userSchema)
module.exports= {usersModel, mongoose}