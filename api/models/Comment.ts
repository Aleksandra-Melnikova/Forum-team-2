import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User id is required'],
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post id is required'],
    },
    text: {
        type: String,
        required: [true, 'Text text is required.'],
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;