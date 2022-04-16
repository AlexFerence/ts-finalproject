import express, { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import db from '../config/database.config';
import { StudentInfoInstance } from '../model/StudentInfoModel';
import { UserInstance } from '../model/UserModel';


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
            console.log(users)
            res.send({ users });
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

export default studentRouter;
