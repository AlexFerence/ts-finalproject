import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { UserInstance } from '../model/UserModel';
import UserValidator from '../validator/UserValidator';

const authRouter = express.Router();

authRouter.post("/signup",
    UserValidator.checkCreateUser(),
    (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(500).send({ error });
        }
    },
    async (req: Request, res: Response) => {
        try {
            console.log("Signing up...");
            const uuid = uuidv4();
            const record = await UserInstance.create({ ...req.body, uuid })
            return res.status(200).send({ record, msg: "Succesfully registered user" });
        } catch (e) {
            return res.status(500).send({ msg: "fail to create", route: "/signup" })
        }
    });

export default authRouter;
