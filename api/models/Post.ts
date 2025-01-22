import mongoose, {Schema} from 'mongoose';
import {IPost} from '../types';

const PostSchema = new mongoose.Schema<IPost>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Требуется идентификатор пользователя.'],
    },
    title: {
        type: String,
        required: [true, 'Требуется идентификатор заголовка.'],
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
        this.invalidate('description', 'Заполните поля описания, либо изображения.');
        this.invalidate('image', 'Заполните поля описания, либо изображения.');
    }
    next();
});

const Post = mongoose.model('Post', PostSchema);
export default Post;