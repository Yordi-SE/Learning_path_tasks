const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.cyp2ike.mongodb.net/TaskDB?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Connected to the database!");
}).catch((err) => {
    console.log("Cannot connect to the database!", err);
});
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