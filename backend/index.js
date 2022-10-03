import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import "dotenv/config";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

// connet to mongoDB via mongoose
mongoose
  .connect(
    "mongodb+srv://admin-dooky:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.uh2nq.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connection to DB success"))
  .catch((err) => console.log("Connection to DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "uploads");
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

//use json to send data
app.use(express.json());
app.use(cors()); //use cors to access to backend from frontend
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Get all");
});

//authorization
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

//registration with validation
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

//about me info
app.get("/auth/me", checkAuth, UserController.getMe);

//image uploader
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

//CRUD
//get all posts
app.get("/posts", PostController.getAll);
//get all tags
app.get("/tags", PostController.getLastTags);
app.get("/posts/tags", PostController.getLastTags);
//get one post
app.get("/posts/:id", PostController.getOne);
//create post
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
//delete post
app.delete("/posts/:id", checkAuth, PostController.remove);
//update post
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(4444, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server started on port 4444");
});
