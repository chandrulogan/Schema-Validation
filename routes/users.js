var express = require('express');
var router = express.Router();
const {usersModel, mongoose} = require('../dbSchema')
const {mongodb, dbName, dbUrl} = require('../dbConfig')
const {hashPassword, hashCompare} = require('../auth')

mongoose.connect(dbUrl)

/* GET users listing. */
router.get('/', async(req, res)=> {
    let users = await usersModel.find()
  res.send({
    statusCode: 200,
    data: users
  })
});

router.post('/signup', async(req, res)=> {
    try{
        const user = await usersModel.find({email:req.body.email})
        console.log(user);
        if(user.length)
        {
            res.send({
                statusCode: 400,
                message: "User Alreay Exist"
            })
        } else {
            const hashedPassword = await hashPassword(req.body.password)
            req.body.password = hashedPassword
            let newUser = await usersModel.create(req.body);
        res.send({
            statusCode: 200,
            message: "Sign Up Successful"
        })
        }     
    } catch(error){
        console.log(error);
        res.send({statusCode: 500, message: "Internal server error", error})
    }
  });

module.exports = router;
