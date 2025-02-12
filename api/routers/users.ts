import express from "express";
import {Error} from "mongoose";
import User from "../models/User";
import auth, {RequestWithUser} from '../middleware/auth';

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();

        await user.save();
        res.send({user, message: "Регистрация прошла успешно!"});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(400).send({error: 'Неверное имя пользователя.'});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Неверный пароль.'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: 'Вы успешно вошли в систему!', user});

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

usersRouter.delete('/sessions', auth, async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;
    try {
        const user = await User.findOne({_id: userFromAuth._id});

        if (user) {
            user.generateToken();
            await user.save();
            res.send({message: 'Вы успешно вышли из системы.'});
        }
    } catch (e) {
        next(e);
    }
});

export default usersRouter;