import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { UserInstance } from '../model/UserModel';
import UserValidator from '../validator/UserValidator';
import Middleware from '../middleware/Middleware';
import jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt');

const authRouter = express.Router();

// Singup route
authRouter.post("/signup",
    UserValidator.checkCreateUser(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            console.log("Signing up...");
            // generate unique id
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

            // get email from user
            const email = req.body.email;

            // TODO: put in env variable
            // token should expire in 1 month
            const token = jwt.sign({ uuid, email }, 'cs307', { expiresIn: '30d' });

            // hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 8);

            // Check if in the awaiting admins list

            // Check if they are a TA or not

            // create user in database with new password and uuid
            const newUser = await UserInstance.create({ ...req.body, password: hashedPassword, uuid })

            // send response
            return res.status(200).send({ newUser, token, msg: "Succesfully registered user" });
        } catch (e) {
            return res.status(500).send({ msg: "fail to create", route: "/signup" })
        }
    }
);

authRouter.post("/login",
    UserValidator.checkLoginUser(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            const user = await UserInstance.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(400).send({ error: "User does not exist" });
            }
            // get password from userInstance
            const password = await user.get("password");
            // compare password with hashed password
            const isPasswordValid = await bcrypt.compare(req.body.password, password);
            if (!isPasswordValid) return res.status(400).send({ error: "Unable to login" });

            // get email from userInterface
            const uuid = await user.get("uuid");
            const email = await user.get("email");

            // generate new jwt for the user
            const token = jwt.sign({ uuid, email }, 'cs307', { expiresIn: '30d' });

            // await user.update({ token });
            res.send({ user, token, msg: "Succesfully logged in" });

        } catch (e) {
            return res.status(500).send({ msg: "fail to login", route: "/login" })
        }
    });

// route to delete user by id
authRouter.delete("/delete/",
    UserValidator.checkEmailProvided(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            // get user by email
            const user = await UserInstance.findOne({ where: { email: req.body.email } });

            if (!user) {
                return res.status(400).send({ error: "User does not exist" });
            }

            // delete user
            const deletedUser = await user.destroy();

            // send response
            return res.status(200).send({ deletedUser, msg: "Succesfully deleted user" });
        } catch (e) {
            return res.status(500).send({ msg: "fail to delete", route: "/delete" })
        }
    }
);

// Get all users route
authRouter.get("/getallusers",
    async (req: Request, res: Response) => {
        try {
            console.log('Getting all users...');
            // get all users from database
            const users = await UserInstance.findAll({ where: {} });
            // send response
            return res.status(200).send({ users, msg: "Succesfully fetched all users" });
        } catch (e) {
            return res.status(500).send({ msg: "failed to get all users", route: "/getallusers" })
        }
    }
)

export default authRouter;