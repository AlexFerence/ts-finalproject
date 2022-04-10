import { body } from 'express-validator';

class UserValidator {
    checkCreateUser() {
        return [
            body('email').isEmail().withMessage('Email is not valid'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
            body('firstName').isLength({ min: 1 }).withMessage('First name is required'),
            body('lastName').isLength({ min: 1 }).withMessage('Last name is required'),
            body('studentID').isLength({ min: 1 }).withMessage('Student ID is required'),
            body('userType').isLength({ min: 1 }).withMessage('User type is required')
        ]
    }
}

export default new UserValidator();