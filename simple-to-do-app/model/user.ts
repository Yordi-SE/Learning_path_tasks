import mongoose, {Document, Schema, Model, model} from 'mongoose';
import bcrypt from 'bcrypt';
interface IUser extends Document{
    username: string,
    password: string
}
const userSchema:Schema<IUser> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
const User:Model<IUser> = model('User', userSchema);
export default User;