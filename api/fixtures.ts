import mongoose from "mongoose";
import config from "./config";
import { randomUUID } from "node:crypto";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("posts");
        await db.dropCollection("comments");
    } catch (e) {
        console.error(e);
    }

    const [jane, john] = await User.create(
        {
            username: "Jane",
            password: "123",
            token: randomUUID(),
        },
        {
            username: "John",
            password: "123",
            token: randomUUID(),
        }
    );

    const [post1, post2, post3, post4] = await Post.create(
        {
            date: new Date(),
            author: jane._id,
            title: "Кто на меня подписан, тот знает: я не такой",
            image: "fixtures/post1.png",
        },
        {
            date: new Date(),
            author: jane._id,
            title: "Кто в аскфм?",
            image: "fixtures/post2.png",
        },
        {
            date: new Date(),
            author: john._id,
            title: "POV: Ты случайно зашёл в мой профиль",
            image: "fixtures/post3.png",
        },
        {
            date: new Date(),
            author: john._id,
            title: "Это не я, это фильтр так решил",
            image: "fixtures/post4.png",
        }
    );

    await Comment.create(
        {
            _id: randomUUID(),
            author: jane._id,
            post: post3._id,
            text: "Это ты сделал? Или интернет уже не тот? ",
        },
        {
            _id: randomUUID(),
            author: jane._id,
            post: post4._id,
            text: "Эта фотка прям 4K, а я на ней как в 144p, спасибо",
        },
        {
            _id: randomUUID(),
            author: john._id,
            post: post1._id,
            text: "А ты куда такой красивый, в магазин за хлебом?",
        },
        {
            _id: randomUUID(),
            author: john._id,
            post: post2._id,
            text: "Дай угадаю, фильтр называется 'Я только что проснулся'?",
        },
        {
            _id: randomUUID(),
            author: jane._id,
            post: post4._id,
            text: "Это лицо перед контрольной по математике?",
        },
        {
            _id: randomUUID(),
            author: john._id,
            post: post2._id,
            text: "Ты гений или просто в TikTok насмотрелся?",
        },
        {
            _id: randomUUID(),
            author: jane._id,
            post: post3._id,
            text: "Похоже, ты взял уроки фотошопа у своей бабушки ",
        },
        {
            _id: randomUUID(),
            author: john._id,
            post: post1._id,
            text: "Красивая фотка! Жду, когда ты подаришь мне пиццу!",
        }
    );

    await db.close();
};

run().catch(console.error);
