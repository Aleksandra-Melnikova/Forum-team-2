import mongoose, {Schema} from 'mongoose';
import {IPost} from '../types';

const PostSchema = new mongoose.Schema<IPost>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required'],
    },
    title: {
        type: String,
        required: [true, 'Post title is required.'],
    },
    description: String,
    image: String,
    datetime: {
        type: Date,
        required: true,
    },
});

PostSchema.pre('validate', function (next) {
    if (!this.description && !this.image) {
        this.invalidate('description', 'Fill in either description or image.');
        this.invalidate('image', 'Fill in either description or image.');
    }
    next();
});

const Post = mongoose.model('Post', PostSchema);
export default Post;