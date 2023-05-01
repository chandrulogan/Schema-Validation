var express = require('express');
var router = express.Router();
const {usersModel, mongoose} = require('../dbSchema')
const {dbUrl} = require('../dbConfig')
const {hashPassword, hashCompare, createToken, jwtDecode, validate} = require('../auth');
const {dataModel} = require('../dataSchema')


const {mongodb,dbdName,dbdUrl,MongoClient} = require('../dbdConfig');
const client = new MongoClient(dbdUrl);



mongoose.connect(dbUrl)

/* GET users listing. */
router.get('/', validate, async(req, res)=> {
    let token = req.headers.authorization.split(" ")[1]
    let data = await jwtDecode(token)
    let users = await usersModel.findOne({email:data.email})
    if(users)
    {
        await client.connect();  
        try{
            const db = client.db(dbdName)
            let request = await db.collection('datas').find().toArray();
            res.send({
              statusCode:200,
              data:request
            })
          } catch (error){
            console.log(error);
            res.send({
              statusCode:500,
              message:"Internal Server",
              error
            })
            }
            finally{
              client.close()
            }
    } else{
        res.send({
            statusCode: 400,
            message: "Unauthorized"
        })
    }
});

router.post('/signin', async(req, res)=>{
    try{
        const user = await usersModel.find({email:req.body.email})
        console.log(user);
        if(user.length)
        {
            let hash = await hashCompare(req.body.password,user[0].password)

            if(hash)
            {
                let token = await createToken(user[0].email, user[0].password)
                res.send({statusCode: 200, message: "Sign-In successfull!!!", token})
            } else{
                res.send({
                    statusCode: 400,
                    message: "Invalid Credentials"
                })
            }
        } else {
            res.send({
                statusCode: 400,
                message: "User Does not Exist"
            })
        }    
    } catch (error){
        console.log(error);
        res.send({statusCode: 500, message: "Internal server error", error})
    }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    let user = await dataModel.findOne({_id: req.params.id})
    if (user) {
      let deletedUser = await dataModel.deleteOne({_id: req.params.id})
      res.send({statusCode: 200, message: "User Deleted Successfully", deletedUser})
    } else {
      res.send({statusCode: 400, message: "User does not exist"})
    }
  } catch (error) {
    console.log(error)
    res.send({statusCode: 500, message: "Internal Server Error", error})
  }
});


module.exports = router;