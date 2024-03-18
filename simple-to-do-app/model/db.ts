import mongoose, {Document, Schema,Model,model, mongo,Types} from 'mongoose';
mongoose.Promise = global.Promise;
// interface ITask extends Document{
//     title: string,
//     description: string,
//     completed: boolean,
//     userId: Types.ObjectId
// }
const TaskSchema: Schema = new Schema({
    title: {
        type: String,

    },
    description: String,
    completed: Boolean,
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
})
const Tasks=model('Tasks',TaskSchema)
mongoose.connect('mongodb+srv://yordanoslemmawork:zeC0vfZAdYiVf5L0@cluster0.cyp2ike.mongodb.net/To-Do-DB?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Connected to the database')
}).catch((err:Error)=>{
    console.log('Error connecting to the database',err)
    
})
export default Tasks;