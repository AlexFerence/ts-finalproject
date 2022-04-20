import express, { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import db from '../config/database.config';
import Middleware from '../middleware/Middleware';
import { CourseInstance } from '../model/CourseModel';
import { ProfessorInfoInstance, ProfessorInfoType } from '../model/ProfessorInfoModel';
import { ProfTeachingCourseInstance } from '../model/ProfTeachingCourse';
import ProfValidator from '../validator/ProfValidator';

const profRouter = express.Router();

// add a professor to the database
profRouter.post("/prof/add",
    ProfValidator.checkCreateProf(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            console.log("Adding prof...");
            const newProf = await ProfessorInfoInstance.create({
                email: req.body.email,
                faculty: req.body.faculty,
                department: req.body.department
            });
            return res.status(200).send(newProf);
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
);

profRouter.delete("/prof/delete/:email",
    async (req: Request, res: Response) => {
        try {
            // TODO put in authentication   
            console.log("Deleting prof...");
            const prof = await ProfessorInfoInstance.findOne({ where: { email: req.params.email } });
            if (prof) {
                await prof.destroy();
                return res.status(200).send({ message: "Prof deleted" });
            }
            else {
                return res.status(400).send({ error: "Prof not found" });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
);

// Get all professors
profRouter.get("/prof/all",
    async (req: Request, res: Response) => {
        try {
            console.log("Getting all profs...");
            const profs = await db.query(
                `SELECT * FROM users U, professorinfo P WHERE U.email = P.email`,
                {
                    type: QueryTypes.SELECT,
                    mapToModel: true,
                }
            );
            return res.status(200).send({ profs });
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
);

// Assign prof to a course
profRouter.post("/prof/assignbyemail",
    ProfValidator.checkAssignProf(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            console.log("Assigning prof...");
            const creatingDoc = await ProfTeachingCourseInstance.create({
                email: req.body.email,
                courseID: req.body.courseID
            });
            return res.status(200).send({ message: "Prof assigned" });
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
);

// Unassign a prof from a course
profRouter.post("/prof/unassignbyemail",
    ProfValidator.checkAssignProf(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            console.log("Unassigning prof...");
            const deletingDoc = await ProfTeachingCourseInstance.findOne({ where: { email: req.body.email, courseID: req.body.courseID } });
            if (deletingDoc) {
                await deletingDoc.destroy();
                return res.status(200).send({ message: "Prof unassigned" });
            }
            else {
                return res.status(400).send({ error: "Prof not found" });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

// Route to retreive all courses a prof teaches
profRouter.get("/prof/courses/:email",
    async (req: Request, res: Response) => {
        try {
            console.log("Getting courses taught by " + req.params.email);
            // make sure email is provided
            if (!req.params.email) {
                return res.status(400).send({ error: "Email not provided" });
            }
            const courses = await db.query(
                `SELECT * FROM profteachcourse PTC, courses C 
                WHERE PTC.courseID = C.courseID
                AND PTC.email = '${req.params.email}'`,
                {
                    type: QueryTypes.SELECT
                }
            );
            return res.status(200).send({ courses });
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
);

// Update TA responsibilities for a course (office hours time & location, duties)
profRouter.post("/prof/updateTADuties",
    ProfValidator.checkAssignTADuties(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            const email = req.body.email;
            const courseID = req.body.courseID;
            const officeHoursTime = req.body.officeHoursTime;
            const officeHoursLocation = req.body.officeHoursLocation;
            const duties = req.body.duties;

            console.log("Updating TA duties...");
            const updatingDoc = await db.query(
                `UPDATE taOfCourse SET officeHoursTime = '${officeHoursTime}', 
                officeHoursLocation = '${officeHoursLocation}', 
                duties = '${duties}'
                WHERE email = '${email}' AND courseID = '${courseID}'`,
                {
                    type: QueryTypes.UPDATE
                }
            );
            return res.status(200).send({ message: "TA duties updated" });
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
);





export default profRouter;