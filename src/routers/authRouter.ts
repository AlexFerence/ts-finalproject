import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { UserInstance, UserType } from '../model/UserModel';
import UserValidator from '../validator/UserValidator';
import Middleware from '../middleware/Middleware';
import jwt from 'jsonwebtoken';
import { StudentInfoInstance, StudentInfoType } from '../model/StudentInfoModel';
import { SysopInfoInstance, SysopInfoType } from '../model/SysopInfoModel';

const bcrypt = require('bcrypt');

const authRouter = express.Router();

interface StudentReturnType {
    uuid: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    studentData?: StudentInfoType
    sysoData?: SysopInfoType
    token: string
    userRoles: string
}

// Singup route
// @params: firstName, lastName, email, password, studentID
// @return: token, user
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
            const userSameStudentID = await StudentInfoInstance.findOne({ where: { studentID: req.body.studentID } });
            if (userSameStudentID) {
                return res.status(400).send({ error: "User already exists with same studentID" });
            }

            // get email from user
            const email = req.body.email;

            // token should expire in 1 month
            const token = jwt.sign({ uuid, email }, 'cs307', { expiresIn: '30d' });

            // hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 8);

            // Check if in the awaiting admins list
            // Check if they are a TA or not

            // IF they are a STUDENT
            // Create user in database with new password and uuid

            const newUserData: UserType = {
                uuid,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email,
                password: hashedPassword
            }

            const newStudentInfoData: StudentInfoType = {
                uuid,
                studentID: req.body.studentID
            }

            const newUser = await UserInstance.create(newUserData);
            const newStudentInfo = await StudentInfoInstance.create(newStudentInfoData);

            const returnData: StudentReturnType = {
                ...newUserData,
                studentData: newStudentInfoData,
                token,
                userRoles: "student "
            }

            // send response
            return res.status(200).send(returnData);
        } catch (e) {
            console.error(e)
            return res.status(500).send({ msg: "caught error: failed to create", route: "/signup" })
        }
    }
);

authRouter.post("/login",
    UserValidator.checkLoginUser(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            // Retreive user
            const user = await UserInstance.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(400).send({ error: "User does not exist" });
            }

            // get email from userInterface
            const userDoc = user.get();

            // compare password with hashed password
            const isPasswordValid = await bcrypt.compare(req.body.password, userDoc.password);
            if (!isPasswordValid) return res.status(400).send({ error: "Unable to login" });

            // generate new jwt for the user
            const token = jwt.sign({ uuid: userDoc.uuid, email: userDoc.email }, 'cs307', { expiresIn: '30d' });

            // String to keep track of user roles
            let userRoles = "";

            // Make sure to override userRoles later
            let returnData: StudentReturnType = { ...userDoc, token, userRoles: "" };

            // Check and retrieve student info
            const studentInfo = await StudentInfoInstance.findOne({ where: { uuid: userDoc.uuid } });
            if (studentInfo) {
                const studentInfoDoc = await studentInfo.get();
                returnData = {
                    ...returnData,
                    studentData: studentInfoDoc,
                }
                userRoles = userRoles + "student ";
            }

            // Check and retrieve sysop info
            const sysopInfo = await SysopInfoInstance.findOne({ where: { uuid: userDoc.uuid } });
            if (sysopInfo) {
                const sysopInfoDoc = await sysopInfo.get();
                userRoles = userRoles + "sysop ";
            }

            // override userRoles
            returnData = { ...returnData, userRoles: userRoles.trim() }

            return res.send(returnData);

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

authRouter.post("/newsysop",
    UserValidator.checkEmailProvided(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            console.log("Adding new sysop...");
            // get user by email
            const user = await UserInstance.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(400).send({ error: "User does not exist" });
            }

            // get uuid from user
            const userDoc = await user.get();

            // create new entry to sysopInfoInstance
            const newSysopInfoData: SysopInfoType = {
                uuid: userDoc.uuid
            }

            const newSysopInfo = await SysopInfoInstance.create(newSysopInfoData);

            // send response
            return res.status(200).send({ newSysopInfo, msg: "Succesfully added new sysop" });
        } catch (e) {
            return res.status(500).send({ msg: "failed to add new sysop", route: "/newsysop" })
        }
    }
);
export default authRouter;