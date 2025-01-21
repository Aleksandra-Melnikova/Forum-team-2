import express from "express";
import cors from "cors";
import config from "./config";
import * as mongoose from "mongoose";



const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));


