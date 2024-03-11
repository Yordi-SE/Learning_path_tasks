const express = require('express')
const { createDb, getDB } = require('./db')
const { json } = require('stream/consumers')
app = express()
app.use(express.json())
let db
createDb(()=>{
    db = getDB()
    app.listen(3000,'127.0.0.1')
})
app.post("/add_store",(req,res)=>{
    db.collection('Store').insertMany(req.body).then(()=>{
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end("posted successfuly to the Store collection")
    })
})
app.post('/add',(req,res)=>{
    db.collection('Store').findOne({name: req.body.name}).then((available)=>{
        if (available){
            db.collection('shopItems' + req.body.id).insertOne({...available, quantity: req.body.quantity})
            res.writeHead(200,{"Content-Type":"text/plain"})
            res.end("Posted Successfully to the ShopItems")
        }
        else {
            res.writeHead(403,{"Content-Type":"text/plain"})
            res.end(" not posted  to the ShopItems")
        }
    })
})
app.get('/my_cart/:id',(req,res)=>{
    rray = []
    db.collection('shopItems' + req.params.id).find().forEach((value)=>rray.push(value)).then(()=>{
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify(rray))
    }).catch((err)=>{
        console.log(err)
    })

})
app.get('/total_price/:id',(req,res)=>{
    total = 0
    db.collection('shopItems' + req.params.id).find().forEach((value)=> total += value.price).then(()=>{
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify({total_price : total}))
    }).catch((err)=>{
        console.log(err)
    })

})

