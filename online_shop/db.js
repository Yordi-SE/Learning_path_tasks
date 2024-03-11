const { MongoClient } = require('mongodb')
let connectedDB
module.exports = {
    createDb : (cb)=>{
        MongoClient.connect('mongodb://127.0.0.1:27017').then((client)=>{
            connectedDB = client.db('OnlineShop');
            return cb()
        }).catch((err)=>{
            if (err ) console.log(err);
        })
        
    },
    getDB: ()=> connectedDB

}
