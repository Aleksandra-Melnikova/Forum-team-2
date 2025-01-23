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
            datetime: new Date(),
            user: jane._id,
            description: "Пирамиды в Древнем Египте строились как гробницы для фараонов и знати. Самая большая из них — пирамида Хеопса, построенная около 2560 года до н. э., состоит из более чем 2 миллионов блоков известняка. Эти сооружения демонстрируют удивительные инженерные достижения для своего времени. Кроме пирамиды Хеопса, знамениты также пирамиды Хефрена и Микерина, а также ступенчатая пирамида Джосера, которая считается одной из первых подобных построек.",
            title: 'Кто на меня подписан, тот знает: я не такой',
            image: "fixtures/post1.png",
        },
        {
            datetime: new Date(),
            user: jane._id,
            description: "Иероглифы были основным письменным языком Древнего Египта и использовались для записи важных текстов, религиозных текстов, исторических событий и указов. Они появились около 3100 года до н. э. и использовались в течение тысячелетий. Система письма включала более 700 символов. Расшифровка иероглифов стала возможной благодаря Розеттскому камню, найденному в 1799 году.",
            title: 'Кто в аскфм?',
            image: "fixtures/post2.png",
        },
        {
            datetime: new Date(),
            user: john._id,
            description: " В религии древних египтян насчитывалось множество богов, каждый из которых был ответственен за разные аспекты жизни и природы. Например, Ра был богом солнца, Осирис — богом загробного мира, а Исида — богиней материнства и магии. Фараоны считались посредниками между богами и людьми, а также были воплощением божественной силы на Земле. Их имена и деяния часто увековечивались в храмовых надписях и памятниках.",
            title: 'POV: Ты случайно зашёл в мой профиль',
            image: "fixtures/post3.png",
        },
        {
            datetime: new Date(),
            user: john._id,
            description: "Мумификация была важной частью египетских обрядов погребения. Египтяне верили, что сохранение тела после смерти необходимо для того, чтобы душа могла продолжать существование в загробной жизни. Процесс мумификации включал удаление внутренних органов, обработку тела специальными маслами и оборачивание льняными бинтами. Мумии помещали в украшенные саркофаги, которые затем помещались в гробницы, заполненные предметами для жизни после смерти.",
            title: 'Это не я, это фильтр так решил',
            image: "fixtures/post4.png",
        }
    );

    await Comment.create(
        {
            user: jane._id,
            post: post3._id,
            text: "Это ты сделал? Или интернет уже не тот? ",
        },
        {
            user: jane._id,
            post: post4._id,
            text: "Эта фотка прям 4K, а я на ней как в 144p, спасибо",
        },
        {
            user: john._id,
            post: post1._id,
            text: "А ты куда такой красивый, в магазин за хлебом?",
        },
        {
            user: john._id,
            post: post2._id,
            text: "Дай угадаю, фильтр называется 'Я только что проснулся'?",
        },
        {
            user: jane._id,
            post: post4._id,
            text: "Это лицо перед контрольной по математике?",
        },
        {
            user: john._id,
            post: post2._id,
            text: "Ты гений или просто в TikTok насмотрелся?",
        },
        {
            user: jane._id,
            post: post3._id,
            text: "Похоже, ты взял уроки фотошопа у своей бабушки ",
        },
        {
            user: john._id,
            post: post1._id,
            text: "Красивая фотка! Жду, когда ты подаришь мне пиццу!",
        }
    );

    await db.close();
};

run().catch(console.error);
