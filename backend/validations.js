import { body } from "express-validator";

export const loginValidation = [
  body("email", "Email указан в неверном формате").isEmail(),
  body("password", "Пароль должен быть больше пяти символов").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Email указан в неверном формате").isEmail(),
  body("fullName", "Полное имя должно быть больше трех символов").isLength({
    min: 3,
  }),
  body("password", "Пароль должен быть больше пяти символов").isLength({
    min: 5,
  }),
  body("avatarUrl", "Указан некорректный URL для аватарки").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов (укажите строку тэгов через запятую)").optional().isArray(),
  body("imageUrl", "Указан некорректный URL для изображения")
    .optional()
    .isString(),
];
