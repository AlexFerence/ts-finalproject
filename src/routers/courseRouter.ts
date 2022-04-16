import express, { Request, Response } from 'express';
import { CourseInstance } from '../model/CourseModel';
import { v4 as uuidv4 } from 'uuid';

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

export default courseRouter;


