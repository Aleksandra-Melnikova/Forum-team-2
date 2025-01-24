import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Требуется идентификатор пользователя.'],
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Требуется идентификатор поста.'],
    },
    text: {
        type: String,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Заполните комментарий",
        },
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;