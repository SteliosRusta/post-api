import { Router } from "express";
import {
  getAllPosts,
  getSinglePost,
  deletePost,
  createPost,
  updatePost,
} from "./posts.js";
import UploadImage from "../Midellwares/UploadImage.js";
import validateJOI from '../Midellwares/validateJOI.js';
import { post } from '../joi/schemas.js';

const postsRouter = Router();

postsRouter
  .route("/")
  .get(getAllPosts)
  //.post(validateJOI(post), createPost)
  .post(UploadImage.single("image"),validateJOI(post), createPost);

postsRouter.route("/:id")
  .get(getSinglePost)
  .put(validateJOI(post), updatePost)
  .delete(deletePost);

export default postsRouter;
