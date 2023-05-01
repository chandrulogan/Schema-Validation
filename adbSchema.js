// we have installed the "npm install mongoose --save"
// we have installed this too "npm I validator"
const Joi = require('joi');
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
    password: {
        type: String,
        required: true,
        validate: {
          validator : function(v) {
            const schema = Joi.string().min(8).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za z\d@$!%*?&]+$/);
            return schema.validate(v)
          },
          message: 'Password must be atleast 8 characters, including at least on uppercase letter, one lowercase letter, one number and special character'
        }
     },

    createdAt:{type:Date, default:Date.now}
})

const usersModel = mongoose.model('users', userSchema)
module.exports= {usersModel, mongoose}