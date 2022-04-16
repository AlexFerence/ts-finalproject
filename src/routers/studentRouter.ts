import express, { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import db from '../config/database.config';


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

export default studentRouter;
