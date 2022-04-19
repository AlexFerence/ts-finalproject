import { body } from 'express-validator';

// Check courseID and email is provided
class Student {
    checkEnrollInClass() {
        return [
            body('uuid').notEmpty().withMessage('Email is required'),
            body('courseID').notEmpty().withMessage('Course ID is required'),
        ]
    }
    checkRateTA() {
        return [
            body('uuid').notEmpty().withMessage('Uuid is required'),
            body('courseID').notEmpty().withMessage('Course ID is required'),
            body('taRatedEmail').notEmpty().withMessage('TA email is required'),
            body('rating').notEmpty().withMessage('Rating is required'),
        ]
    }
}

export default new Student();