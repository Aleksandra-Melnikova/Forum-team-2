import express from "express";
import {Error} from "mongoose";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";


const userRouter = express.Router();


userRouter.post('/register', async (req, res, next) => {
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

userRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(400).send({error: 'Не найден пользователь с таким именем'});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Неверный пароль!'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: 'Имя и пароль введены верно!', user});

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

userRouter.delete('/sessions', auth, async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;
    try {
        const user = await User.findOne({_id: userFromAuth._id});
        if (user) {
            user.generateToken();
            await user.save();
            res.send({message: 'Успешный вход в систему!', user: user});
        }
    } catch (e) {
        next(e)
    }


});

userRouter.post('/secret', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;
    res.send({message: 'Доступ к данным запрещён', user: user});
});

export default userRouter;