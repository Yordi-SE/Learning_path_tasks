import mongoose, {Document, Schema,Model,model} from 'mongoose';
interface ITask extends Document{
    title: string,
    description: string
    completed: true|false
}
const TaskSchema: Schema<ITask> = new Schema<ITask>({
    title: {
        type: String,

    },
    description: String,
    completed: Boolean
})
const Tasks:Model<ITask>=model<ITask>('Tasks',TaskSchema)
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.cyp2ike.mongodb.net/To-do-db?retryWrites=true&w=majority&appName=Cluster0')
export default Tasks;