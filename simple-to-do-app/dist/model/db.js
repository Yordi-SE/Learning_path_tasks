"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
// interface ITask extends Document{
//     title: string,
//     description: string,
//     completed: boolean,
//     userId: Types.ObjectId
// }
const TaskSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    description: String,
    completed: Boolean,
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const Tasks = (0, mongoose_1.model)('Tasks', TaskSchema);
mongoose_1.default.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.cyp2ike.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database', err);
});
exports.default = Tasks;
