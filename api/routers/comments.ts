import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import Post from "../models/Post";
import Comment from "../models/Comment";
import {Error} from "mongoose";

const commentsRouter = express.Router();

commentsRouter.post("/", auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (!user) {
        res.status(400).send({error: 'Пользователь не найден'});
        return;
    }

    if (!req.query.post_id) {
        res.status(400).send({error: "Текст и Post_id должны присутствовать в запросе."});
        return;
    }

    const postId = await Post.findById(req.query.post_id);

    if (!postId) {
        res.status(400).send({error: "Пост не найден"});
        return;
    }
    try{

        const newComment = new Comment({
            user: user._id,
            post: req.query.post_id,
            text: req.body.text,
        });

        await newComment.save();
        res.send(newComment);

    }catch(error){
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

commentsRouter.get("/",  async (req, res, next) => {
    try{

        if (!req.query.post_id) {
            res.status(400).send({error: "Текст и Post_id должны присутствовать в запросе."});
            return;
        }

        const post = await Post.findById(req.query.post_id);

        if (!post) {
             res.status(400).send({error: "Пост не найден"});
            return;
        }

        const comments = await Comment.find({post: req.query.post_id}).populate('user', 'username');

        res.send(comments);

    }catch(error){
        next(error);
    }
})

export default commentsRouter