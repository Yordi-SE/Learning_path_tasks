const { createDb,getDB } = require('./db')
const http = require('http');
const Store = [{
    name : "coffe",
    price: 20,
    quantity:20
},
{
    name : "tv",
    price: 20,
    quantity:20
},
{
    name : "tea",
    price: 20,
    quantity:20
},
{
    name : "cloth",
    price: 20,
    quantity:20
},
{
    name : "shoes",
    price: 20,
    quantity:20
},
{
    name : "laptop",
    price: 20,
    quantity:20
},
{
    name : "books",
    price: 20,
    quantity:20
}]

createDb(()=>{
    const db = getDB();
    db.collection("Store").insertMany(Store).then(()=>{
        const server = http.createServer((req,res)=>{
            let parsed_data
            if (req.url === '/add' && req.method === 'POST') {
                request_body = ''
                req.on('data',(chunck)=>{
                    request_body += chunck.toString();
                })
                req.on('end',()=>{
                    if (request_body){
                        parsed_data = JSON.parse(request_body)
                        db.collection('Store').findOne({name:parsed_data.name}).then((available)=>{
                            if (available && parsed_data.quantity >=0 && available.quantity >= parsed_data.quantity){
                                db.collection('shopItems').findOne({_id:available._id}).then((data)=>{
                                    if (data){
                                        db.collection("shopItems").updateOne({_id:data._id},{$set:{quantity:parsed_data.quantity}})
                                    }
                                    else{
                                        db.collection('shopItems').insertOne({...available,quantity:parsed_data.quantity})
                                    }
                                })
                                res.writeHead(201,{"Content-Type":"text/plain"})
                                res.end("SuccessFully Posted")
                            }
                            else{
                                res.writeHead(400,{"Content-Type":"text/plain"})
                                res.end("Bad request")
                            }
                        })
                    }
                    else {
                        res.writeHead(400,{"Content-Type":"text/plain"})
                        res.end("content absent")
                    }
    
                })
            }
            else if (req.url === '/total_price' && req.method == "GET"){
                total = 0
                db.collection('shopItems').find().forEach(value=>total += value.price).then(()=>{
                    res.writeHead(201,{"Content-Type":"text/plain"})
                    res.end(`total price is ${total}`)
                })
    
            }
            else if (req.url === '/show_cart' && req.method == "GET"){
                arr = []
                db.collection('shopItems').find().forEach(value=>arr.push(value)).then(()=>{
                    res.writeHead(201,{"Content-Type":"application/json"})
                    res.end(JSON.stringify(arr))
                })    
            }
            else{
                res.writeHead(400,{"Content-Type":"text/plain"})
                res.end("Bad request")
            }
        })
        server.listen(3000,'127.0.0.1');
    })
    
    
});

