import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { UserInstance } from '../model/UserModel';
import UserValidator from '../validator/UserValidator';
import Middleware from '../middleware/Middleware';

const authRouter = express.Router();

// Singup route
authRouter.post("/signup",
    UserValidator.checkCreateUser(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            console.log("Signing up...");
            const uuid = uuidv4();

            // check if user already exists with same email
            const userSameEmail = await UserInstance.findOne({ where: { email: req.body.email } });
            if (userSameEmail) {
                return res.status(400).send({ error: "User already exists with same email" });
            }

            // check if user already has same studentID
            const userSameStudentID = await UserInstance.findOne({ where: { studentID: req.body.studentID } });
            if (userSameStudentID) {
                return res.status(400).send({ error: "User already exists with same studentID" });
            }

            const newUser = await UserInstance.create({ ...req.body, uuid })
            return res.status(200).send({ newUser, msg: "Succesfully registered user" });
        } catch (e) {
            return res.status(500).send({ msg: "fail to create", route: "/signup" })
        }
    });

authRouter.post("/login",
    UserValidator.checkLoginUser(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            console.log("Logging in...");
            const user = await UserInstance.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(400).send({ error: "User does not exist" });
            }



        } catch (e) {
            return res.status(500).send({ msg: "fail to login", route: "/login" })
        }
    });


// Get all users route
authRouter.get("/getallusers",
    async (req: Request, res: Response) => {
        try {
            const users = await UserInstance.findAll();
            return res.status(200).send({ users });
        } catch (e) {
            return res.status(500).send({ msg: "fail to get all users", route: "/getallusers" })
        }
    }
)

export default authRouter;
