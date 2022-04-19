import express, { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import db from '../config/database.config';
import Middleware from '../middleware/Middleware';
import { StudentInfoInstance } from '../model/StudentInfoModel';
import { StudentTakingCourseInstance } from '../model/StudentTakingCourse';
import { TARatingInstance } from '../model/TARating';
import { UserInstance } from '../model/UserModel';
import StudentValidator from '../validator/StudentValidator';


const studentRouter = express.Router();

studentRouter.get("/getallstudents",
    async (req: Request, res: Response) => {
        try {
            const users = await db.query(
                `SELECT * FROM users U, studentinfo S WHERE U.uuid = S.uuid`,
                {
                    type: QueryTypes.SELECT,
                    mapToModel: true,
                }
            );
            return res.send({ users });
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

studentRouter.delete("/student/delete/:uuid",
    async (req: Request, res: Response) => {
        try {
            const uuid = req.params.uuid;
            const student = await StudentInfoInstance.findOne({ where: { uuid: uuid } })
            if (!student) {
                return res.status(400).send({ error: "Student does not exist" });
            }
            const deletedStudent = await student.destroy();

            // delete user document of student too
            const user = await UserInstance.findOne({ where: { uuid: uuid } })
            if (!user) {
                return res.status(400).send({ error: "User does not exist" });
            }
            await user.destroy();
            return res.status(200).send({ deletedStudent, msg: "Succesfully deleted student" });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ msg: "fail to delete", route: "/student/delete" })
        }
    }
)

studentRouter.post("/student/enrollinclass",
    StudentValidator.checkEnrollInClass(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            const { uuid, courseID } = req.body;
            const student = await StudentInfoInstance.findOne({ where: { uuid: uuid } })
            if (!student) {
                return res.status(400).send({ error: "Student does not exist" });
            }
            // Check if a course exists with courseID
            const couseExistsRes = StudentTakingCourseInstance.findOne({ where: { courseID: courseID } })
            if (!couseExistsRes) {
                return res.status(400).send({ error: "Course does not exist" });
            }

            // Add student to course
            const studentTakingCourse = await StudentTakingCourseInstance.create({
                uuid: uuid,
                courseID: courseID,
            })
            console.log("enrolled in class")
            return res.status(200).send({ studentTakingCourse, msg: "Succesfully enrolled student" });

        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ msg: "fail to enroll", route: "/student/enrollinclass" })
        }
    }
)

// Get all classes for a student
studentRouter.get("/student/getallclasses/:uuid",
    async (req: Request, res: Response) => {
        try {
            const uuid = req.params.uuid;

            interface CourseForStudent {
                uuid: string,
                courseID: string,
                createdAt: string,
                updatedAt: string,
                term: string,
                year: string,
                courseNumber: string,
                courseName: string,
                courseCode: string,
                tas: any
            }

            const enrolledCourses: CourseForStudent[] = await db.query(`SELECT * FROM studenttakingcourse STC, courses C 
                WHERE STC.courseID = C.courseID AND STC.uuid = '${uuid}'`,
                {
                    type: QueryTypes.SELECT
                }
            );

            console.log("enrolledCourses");
            console.log(enrolledCourses);

            return res.send({ enrolledCourses });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ msg: "fail to get all classes", route: "/student/getallclasses" })
        }
    }
)

// Rate a TA from student perspective
studentRouter.post("/student/rateTA",
    StudentValidator.checkRateTA(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            const { uuid, taRatedEmail, courseID, rating, comment } = req.body;
            // Add rating to database
            const ratingRes = TARatingInstance.create({
                ratedByUuid: uuid,
                taRatedEmail: taRatedEmail,
                courseID: courseID,
                rating: rating,
                comment: comment,
            })
            return res.status(200).send({ ratingRes, msg: "Succesfully rated TA" });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ msg: "fail to rate", route: "/student/rateTA" })
        }
    }
)


export default studentRouter;
