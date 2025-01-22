import express from 'express';
import Post from '../models/Post';
import {imagesUpload} from '../multer';
import mongoose, {Error} from 'mongoose';
import User from '../models/User';

const postsRouter = express.Router();

postsRouter.post('/', imagesUpload.single('image'), async (req: express.Request, res: express.Response, next) => {
    const {title, description} = req.body;
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: 'No token present'});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'No user matches this token'});
        return;
    }

    try {
        const post = new Post({
            user: user._id,
            title: title,
            description: description,
            image: req.file ? 'images' + req.file.filename : null,
            datetime: new Date().toISOString(),
        });

        await post.validate();
        await post.save();

        res.send(post);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send({error});
            return;
        }
        next(error);
    }
});

postsRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    try {
        const posts = await Post
            .find()
            .populate('user', '-_id -token -password -__v')
            .sort({datetime: -1});

        res.send(posts);
    } catch (e) {
        next(e);
    }
});

postsRouter.get('/:id', async (req: express.Request, res: express.Response, next) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send('Invalid post ID.');
        return;
    }

    try {
        const post = await Post
            .findById(id)
            .populate('user', '-_id -token -password -__v');

        if (!post) {
            res.status(404).send({error: 'Post not found'});
            return;
        }

        res.send(post);
    } catch (e) {
        next(e);
    }
});

export default postsRouter;