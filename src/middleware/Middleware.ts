import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

class Middleware {
    handleValidationError(req: Request, res: Response, next: NextFunction) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(500).send({ error });
        }
        next();
    }
}

export default new Middleware();