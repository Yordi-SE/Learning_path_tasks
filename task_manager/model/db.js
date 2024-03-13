const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://yordanoslemmawork:zeC0vfZAdYiVf5L0@cluster0.cyp2ike.mongodb.net/TaskDB?retryWrites=true&w=majority&appName=Cluster0')
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        timestamps: true
    }
},{timestamps : { updatedAt: 'updatedAt' }})
Tasks = mongoose.model("Tasks",TaskSchema)
module.exports = Tasks