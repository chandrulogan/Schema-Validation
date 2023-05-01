// we have to install  the  mongoDB here in order to connect the mongoDB
// npm i mongodb

const mongodb = require('mongodb');
const dbdName = 'Authentication';
const dbdUrl = `mongodb+srv://zen-class-35:Chandru1234@chandruloganathan.ckkhhdb.mongodb.net/${dbdName}?retryWrites=true&w=majority`;
const MongoClient = mongodb.MongoClient;


module.exports ={mongodb,dbdName,dbdUrl,MongoClient}