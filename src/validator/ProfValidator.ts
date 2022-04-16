import { body } from 'express-validator';

class ProfValidator {
    checkCreateProf() {
        return [
            body('email').isEmail().withMessage('Email is not valid'),
            body('faculty').isString().withMessage('Faculty is not valid'),
            body('department').isString().withMessage('Department is not valid'),
        ]
    }
    checkAssignProf() {
        return [
            body('profEmail').isEmail().withMessage('Email is not valid'),
            body('courseID').isUUID(4).withMessage('Course ID is not valid'),
        ]
    }
}

export default new ProfValidator();