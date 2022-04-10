import express, { Request, Response } from 'express';
import db from "./config/database.config"
import authRouter from './routers/authRouter';

const app = express();
const port = 3000;

app.use(express.json());

db.sync().then(() => {
    console.log("Connected to db");
})

app.use(authRouter);

app.get("/", (req: Request, res: Response) => {
    console.log('Someones here!')
    return res.send("hello world");
})

app.listen(port, () => {
    console.log('App running on port ' + port)
})

