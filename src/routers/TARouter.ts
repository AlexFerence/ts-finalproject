import express, { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import db from '../config/database.config';
import Middleware from '../middleware/Middleware';
import { TAInfoInstance } from '../model/TAInfoModel';
import { TAofCourseInstance } from '../model/TAofCourseModel';
import TAValidator from '../validator/TAValidator';

const taRouter = express.Router();

taRouter.post('/ta/add',
    TAValidator.checkCreateTA(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            console.log("Adding TA...");
            const newTA = await TAInfoInstance.create({
                email: req.body.email,
                faculty: req.body.faculty,
                department: req.body.department,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            });
            return res.status(200).send(newTA);
        } catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

// Route to get all the tas
taRouter.get('/ta/all',
    async (req: Request, res: Response) => {
        try {
            const tas = await db.query(
                `SELECT T.email as email, U.firstName AS firstname, U.lastName AS lastname,
                faculty, department, T.firstName AS backupFirstName, T.lastName AS backupLastName
                FROM taInfo T LEFT JOIN users U ON U.email = T.email`,
                {
                    type: QueryTypes.SELECT,
                    mapToModel: true,
                }
            );
            return res.status(200).send({ tas });
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

taRouter.delete('/ta/delete/:email',
    async (req: Request, res: Response) => {
        try {
            const email = req.params.email;
            const ta = await TAInfoInstance.findOne({ where: { email: email } })
            if (!ta) {
                return res.status(400).send({ error: "TA does not exist" });
            }
            const deletedTA = await ta.destroy();
            return res.status(200).send({ deletedTA, msg: "Succesfully deleted TA" });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ msg: "fail to delete", route: "/ta/delete" })
        }
    }
)

// Route to assign a TA to a course
taRouter.post('/ta/assignToCourse',
    TAValidator.checkAssignTA(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            const email = req.body.email;
            const courseID = req.body.courseID;
            const assignRes = await TAofCourseInstance.create({
                email,
                courseID,
                officeHoursTime: "not assigned",
                officeHoursLocation: "not assigned",
                duties: "not assigned"
            });
            if (assignRes) {
                return res.status(200).send({ msg: "Successfully assigned TA to course" });
            }
            else {
                return res.status(400).send({ msg: "Failed to assign TA to course" });
            }
        } catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

// Route to unassign a ta from a course
taRouter.post('/ta/unassignFromCourse',
    TAValidator.checkAssignTA(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            const email = req.body.email;
            const courseID = req.body.courseID;
            const unassignRes = await TAofCourseInstance.findOne({ where: { email: email, courseID: courseID } })

            if (!unassignRes) {
                return res.status(400).send({ error: "TA is not assigned to this course" });
            }

            const deletedTA = await unassignRes.destroy();
            return res.status(200).send({ deletedTA, msg: "Succesfully unassigned TA from course" });

        } catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

// Route to get all courses of a TA
taRouter.get('/ta/courses/:email',
    async (req: Request, res: Response) => {
        try {
            const email = req.params.email;
            const courses = await db.query(
                `SELECT * FROM courses C, taOFcourse T
                WHERE T.email = '${email}' AND T.courseID = C.courseID`,
            );
            if (courses) {
                return res.status(200).send({ courses });
            }
            else {
                return res.status(400).send({ error: "Failed to get courses" });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

taRouter.post('/ta/getratingsfortaandcourse',
    TAValidator.getRatingsForTAandCourse(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            const email = req.body.email;
            const courseID = req.body.courseID;
            const ratings = await db.query(
                `SELECT * FROM ratings R, taOFcourse T
                WHERE T.email = '${email}' AND T.courseID = '${courseID}' AND R.courseID = '${courseID}'`,
            );
            if (ratings) {
                return res.status(200).send({ ratings });
            }
            else {
                return res.status(400).send({ error: "Failed to get ratings" });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)


export default taRouter;