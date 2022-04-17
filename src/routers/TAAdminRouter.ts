import express, { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import db from '../config/database.config';
import Middleware from '../middleware/Middleware';
import { TAAdminInstance } from '../model/TAAdminModel';
import { TAInfoInstance } from '../model/TAInfoModel';
import TAValidator from '../validator/TAValidator';

const taAdminRouter = express.Router();

// Add taAdmin route
taAdminRouter.post('/taAdmin/add',
    TAValidator.checkCreateTA(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            console.log("Adding TA...");
            const newTA = await TAAdminInstance.create({
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

// Remove TA Route
taAdminRouter.delete('/taAdmin/delete/:email',
    async (req: Request, res: Response) => {
        try {
            const email = req.params.email;
            const ta = await TAAdminInstance.findOne({ where: { email: email } })
            if (!ta) {
                return res.status(400).send({ error: "TA does not exist" });
            }
            await ta.destroy();
            return res.status(200).send({ message: "TA deleted" });
        } catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
)

// get all ta admins route
taAdminRouter.get('/taAdmin/all',
    async (req: Request, res: Response) => {
        try {
            const tas = await db.query(
                `SELECT T.email as email, U.firstName AS firstname, U.lastName AS lastname,
                faculty, department, T.firstName AS backupFirstName, T.lastName AS backupLastName
                FROM taAdmin T LEFT JOIN users U ON U.email = T.email`,
                {
                    type: QueryTypes.SELECT
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




export default taAdminRouter;