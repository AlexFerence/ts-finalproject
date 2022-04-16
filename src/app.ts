import express, { Request, Response } from 'express';
import db from "./config/database.config"
import authRouter from './routers/authRouter';
import cors from 'cors';
import profRouter from './routers/profRouter';
import studentRouter from './routers/studentRouter';

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

app.get("/", (req: Request, res: Response) => {
    console.log('Someones here!')
    return res.send("hi diego");
})

app.listen(port, () => {
    console.log('App running on port ' + port)
})

