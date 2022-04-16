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
            const prof = await ProfessorInfoInstance.findOne({ where: { email: req.body.profEmail } });
            if (!prof) {
                return res.status(400).send({ error: "Cannot assign: Prof not found" });
            }

            const course = await CourseInstance.findOne({ where: { courseID: req.body.courseID } });
            if (!course) {
                return res.status(400).send({ error: "Cannot assign: Course not found" });
            }

            await ProfTeachingCourseInstance.create({
                profEmail: req.body.profEmail,
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



export default profRouter;