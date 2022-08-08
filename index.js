import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator/src/validation-result.js';
import 'dotenv/config'

import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js';

mongoose
    .connect('mongodb+srv://admin-dooky:' + process.env.MONGO_PASSWORD + '@cluster0.uh2nq.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connection to DB success'))
    .catch((err) => console.log('Connection to DB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Get all');
});

app.post('/auth/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password
    const salt = await bcrypt.genSalt(10)

    const doc = new UserModel({
        fullName: req.body.fullname,
        email: req.body.email,
        avatarUrl: req.body.avatarUrl,
        passwordHash: req.body.password
    });
    res.json({
        success: true,
    });
});

app.listen(4444, (err) => {
    if (err) {
      return console.log(err);
    } 
    console.log('Server started on port 4444');
})