const mongoose = require("mongoose")
const Item = new mongoose.Schema({
    name: String,
    price: {
        type: Number,
        // required: true
    },
    quantity: Number
})
module.exports = {
    Item : mongoose.model('Item',Item),
    Cart : mongoose.model('Cart',Item)
}