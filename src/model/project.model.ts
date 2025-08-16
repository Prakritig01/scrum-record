import mongoose from "mongoose";

export interface IProject extends Document{
    _id : mongoose.Types.ObjectId;
    name: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    members? : mongoose.Types.ObjectId[]; // Array of user IDs
    createdBy: mongoose.Types.ObjectId; // User ID of the creator
}


const projectSchema = new mongoose.Schema<IProject>({
    name : {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        default: [],
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    }

}, {
    timestamps: true,   
});

const Project = mongoose.model<IProject>("Project" , projectSchema);
export default Project;