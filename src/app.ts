import express, { Request, Response } from 'express';
import db from "./config/database.config"
import authRouter from './routers/authRouter';
import cors from 'cors';
import profRouter from './routers/profRouter';
import studentRouter from './routers/studentRouter';
import courseRouter from './routers/courseRouter';
import taRouter from './routers/TARouter';
import { QueryTypes } from 'sequelize';
import taAdminRouter from './routers/TAAdminRouter';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

db.sync().then(() => {
    console.log("Connected to db");
})

app.use(authRouter);
app.use(profRouter);
app.use(studentRouter);
app.use(profRouter);
app.use(courseRouter);
app.use(taRouter);
app.use(taAdminRouter);

app.get("/", async (req: Request, res: Response) => {
    try {
        const dropRes = await db.query(`DROP TABLE profteachcourse`);
        if (dropRes) {
            console.log("Dropped profteachcourse table");
            return res.send("success");
        }
        return res.send("fail");
    }
    catch (err) {
        console.error(err);
        return res.status(400).send({ error: err });
    }


})

app.listen(port, () => {
    console.log('App running on port ' + port)
})

