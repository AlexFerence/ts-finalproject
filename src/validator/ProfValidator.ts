import { body } from 'express-validator';

class ProfValidator {
    checkCreateProf() {
        return [
            body('email').isString().withMessage('Email is not valid'),
            body('faculty').isString().withMessage('Faculty is not valid'),
            body('department').isString().withMessage('Department is not valid'),
        ]
    }
    checkAssignProf() {
        return [
            body('email').isString().withMessage('Email is not valid'),
            body('courseID').isUUID(4).withMessage('Course ID is not valid'),
        ]
    }
    checkAssignTADuties() {
        return [
            body('email').isString().withMessage('Email is not valid'),
            body('courseID').isUUID(4).withMessage('Course ID is not valid'),
            body('officeHoursTime').isString().withMessage('Office hours time is not valid'),
            body('officeHoursLocation').isString().withMessage('Office hours location is not valid'),
            body('duties').isString().withMessage('Duties is not valid')
        ]
    }
}

export default new ProfValidator();