const mongoose = require('mongoose')
const {Item }= require("./Item.js")
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
async function init(){
    const data = await Item.findOne();
    if(!data){
        await Item.insertMany(Store);
    }
}
module.exports = {
    init: init,
    Item: Item
}
// Item.insertMany(Store).then()