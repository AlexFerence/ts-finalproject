import express, { Request, Response } from 'express';
import Middleware from '../middleware/Middleware';
import { ProfessorInfoInstance, ProfessorInfoType } from '../model/ProfessorInfoModel';
import ProfValidator from '../validator/ProfValidator';

const profRouter = express.Router();

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
            return res.status(200).send({ prof: newProf, message: "Prof added" });
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({ error: err });
        }
    }
);

export default profRouter;