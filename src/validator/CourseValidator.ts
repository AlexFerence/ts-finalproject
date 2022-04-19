import { body } from 'express-validator';

class CourseValidator {
    checkCreateCourse() {
        return [
            body('term').isLength({ min: 1 }).withMessage('Term is required'),
            body('year').isLength({ min: 1 }).withMessage('Year is required'),
            body('courseNumber').isLength({ min: 1 }).withMessage('Course number is required'),
            body('courseName').isLength({ min: 1 }).withMessage('Course name is required')
        ]
    }
    checkAlreadySubmittedReviews() {
        return [
            body('uuid').isLength({ min: 1 }).withMessage('Course ID is required'),
            body('courseID').isLength({ min: 1 }).withMessage('Email is required'),
        ]
    }
}

export default new CourseValidator();