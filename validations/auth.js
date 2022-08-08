import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Email указан в неверном формате').isEmail(),
    body('password', 'Пароль должен быть больше пяти символов').isLength({ min: 5 }), 
    body('fullName', 'Полное имя должно быть больше трех символов').isLength({ min: 3 }),
    body('avatarUrl', 'Указан некорректный URL для аватарки').optional().isURL(),
];