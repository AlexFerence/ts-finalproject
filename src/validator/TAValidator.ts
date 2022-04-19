import { body } from 'express-validator';

class TAValidator {
    checkCreateTA() {
        return [
            body('email').isEmail().withMessage('Email is not valid'),
            body('faculty').isString().withMessage('Faculty is not valid'),
            body('department').isString().withMessage('Department is not valid'),
            body('firstName').isString().withMessage('First name is not valid'),
            body('lastName').isString().withMessage('Last name is not valid'),
        ]
    }
    checkAssignTA() {
        return [
            body('email').isEmail().withMessage('Email is not valid'),
            body('courseID').isUUID(4).withMessage('Course ID is not valid'),
        ]
    }
    getRatingsForTAandCourse() {
        return [
            body('email').isEmail().withMessage('Email is not valid'),
            body('courseID').isUUID(4).withMessage('Course ID is not valid'),
        ]
    }

}

export default new TAValidator();