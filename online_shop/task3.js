const mongoose = require('mongoose');
const {Cart} = require('./Item.js')
const {init,Item} = require('./Add_t0_store.js')
mongoose.connect("mongodb://127.0.0.1:27017")
const http = require('http');
init().then(()=>{
    const server = http.createServer((req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        console.log(req.method)
        let parsed_data
        if (req.url === '/add' && req.method === 'POST' ) {
            request_body = ''
            req.on('data',(chunck)=>{
                request_body += chunck.toString();
            })
            req.on('end',()=>{
                if (request_body){
                    parsed_data = JSON.parse(request_body)
                    Item.findOne({name :parsed_data.name}).then((available)=>{
                        if (available && parsed_data.quantity >= 0 && available.quantity >= parsed_data.quantity) {
                            Cart.findOne({name: parsed_data.name}).then((data)=>{
                                if (data){
                                    const sums = (parseInt(data.quantity) + parseInt(parsed_data.quantity))
                                    // console.log(sums)
                                    if (sums > available.quantity){
                                        res.writeHead(400,{"Content-Type":"text/plain"})
                                        res.end("There is no enough items in the store") 
                                    }
                                    else{
                                        data.quantity = sums
                                        data.save()
                                        res.writeHead(200,{"Content-Type":"text/plain"})
                                        res.end("success")
                                    }
    
                                }
                                else {
                                    Cart.create({name:available.name,price:available.price,quantity:parsed_data.quantity})
                                    res.writeHead(200,{"Content-Type":"text/plain"})
                                    res.end("success")
                                }
                            })
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
        else if (req.url === '/total_price' && req.method === "GET"){
            total = 0
            Cart.find().then((doc)=>{
                doc.forEach(val => total += (val.price * val.quantity))
                console.log(doc)
                res.writeHead(201,{"Content-Type":"text/plain"})
                res.end(`total price is ${total}`)
            })

        }
        else if (req.url === '/show_cart' && req.method === "GET"){
            arr = []
            Cart.find().then((doc)=>{
                res.writeHead(201,{"Content-Type":"application/json"})
                res.end(JSON.stringify(doc))
            })    
        }
        else if (req.url === '/update_cart' && req.method === "PUT"){
            request_body = ''
            req.on('data',(chunck)=>{
                request_body += chunck.toString();
            })
            req.on('end',()=>{
                if (request_body){
                    parsed_data = JSON.parse(request_body);
                    Cart.findOneAndUpdate({name:parsed_data.name},{quantity:parsed_data.quantity},{new:true}).then((modified)=>{
                        if (modified){
                            res.writeHead(200,{"Content-Type":"text/plain"})
                            res.end("success")
                        }
                        else{
                            res.writeHead(404,{"Content-Type":"text/plain"})
                            res.end("Not Found")
                        }
                    })
                }

            })

        }
        else if (req.url === '/delete' && req.method === "DELETE"){
            request_body = ''
            req.on('data',(chunck)=>{
                request_body += chunck.toString();
            })
            req.on('end',()=>{
                if (request_body){
                    parsed_data = JSON.parse(request_body);
                    Cart.findOneAndDelete({name:parsed_data.name}).then((deleted)=>{
                        if (deleted){
                            res.writeHead(200,{"Content-Type":"text/plain"})
                            res.end("success")
                        }
                        else{
                            res.writeHead(404,{"Content-Type":"text/plain"})
                            res.end("Not Found")
                        }
                    })

                }
                else {
                    res.writeHead(400,{"Content-Type":"text/plain"})
                    res.end("Bad request")
                }

            })
        }
        else{
            
            res.writeHead(400,{"Content-Type":"text/plain"})
            res.end("Bad request")
        }
    })
    server.listen(3000,'127.0.0.1');
})


