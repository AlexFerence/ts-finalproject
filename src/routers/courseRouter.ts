import express, { Request, Response } from 'express';
import { CourseInstance } from '../model/CourseModel';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database.config';
import { QueryTypes } from 'sequelize';
import { TARatingInstance } from '../model/TARating';
import CourseValidator from '../validator/CourseValidator';
import Middleware from '../middleware/Middleware';

const courseRouter = express.Router();

// Generate uniqie id for each course

courseRouter.post("/course/add",
    async (req: Request, res: Response) => {
        try {
            console.log("Adding course...");
            const uuid = uuidv4();
            const newCourse = await CourseInstance.create({
                courseID: uuid,
                term: req.body.term,
                year: req.body.year,
                courseNumber: req.body.courseNumber,
                courseCode: req.body.courseCode,
                courseName: req.body.courseName
            });
            return res.status(200).send(newCourse);
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
);

// Get all courses
courseRouter.get("/course/all",
    async (req: Request, res: Response) => {
        try {
            console.log("Getting all courses...");
            const courses = await CourseInstance.findAll({ where: {} });
            return res.status(200).send({ courses });
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ msg: "failed to get all courses", route: "/course/all" })
        }
    }
);

// Route to get all the tas of a course
courseRouter.get('/course/tas/:courseID',
    async (req: Request, res: Response) => {
        try {
            const courseID = req.params.courseID;
            const tasRes = await db.query(
                `SELECT * FROM taOfCourse TOC, taInfo TA, users U  
                WHERE courseID = '${courseID}'
                AND TOC.email = TA.email
                AND U.email = TA.email`,
                { type: QueryTypes.SELECT }
            );
            return res.send({ tas: tasRes });
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

// Route to get all the tas of a course
courseRouter.get('/course/tas/reviewedByUser/:courseID/:uuid',
    async (req: Request, res: Response) => {
        try {
            const uuid = req.params.uuid;
            const courseID = req.params.courseID;

            console.log(uuid)
            console.log(courseID)
            // check if TA.email is in alreadyReviewedByUser
            const tasRes = await db.query(
                `WITH alreadyReviewedByUser AS (
                    SELECT taRatedEmail FROM taRating TR 
                    WHERE TR.ratedByUuid = '${uuid}'
                    AND TR.courseID = '${courseID}' 
                )
                SELECT U.email,  U.firstName, U.lastName, TOC.courseID, TOC.updatedAt, TOC.createdAt,
                U.uuid, U.password, 
                TA.department, TA.faculty, IIF ( U.email in (SELECT * FROM alreadyReviewedByUser), 1, 0) AS reviewed
                FROM taOfCourse TOC LEFT JOIN taInfo TA LEFT JOIN users U
                WHERE courseID = '${courseID}'
                AND TOC.email = TA.email
                AND U.email = TA.email`,
                { type: QueryTypes.SELECT }
            );



            return res.send({ tas: tasRes });
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

courseRouter.post('/course/tas/alreadyreviewedbyuser',
    CourseValidator.checkAlreadySubmittedReviews(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            console.log("Checking if already reviewed by user...");
            const courseID = req.body.courseID;
            const uuid = req.body.uuid;
            console.log(uuid)
            console.log(courseID)
            const alreadyReviewedRes = await db.query(
                `SELECT * FROM taRating TR WHERE TR.ratedByUuid = '${uuid}' AND TR.courseID = '${courseID}'`,
                { type: QueryTypes.SELECT });
            return res.send({ tas: alreadyReviewedRes });
        } catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

export default courseRouter;