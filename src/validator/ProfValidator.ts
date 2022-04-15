import { body } from 'express-validator';

class ProfValidator {
    checkCreateProf() {
        return [
            body('email').isEmail().withMessage('Email is not valid'),
            body('faculty').isLength({ min: 1 }).withMessage('Faculty is required'),
            body('department').isLength({ min: 1 }).withMessage('Department is required')
        ]
    }
}

export default new ProfValidator();