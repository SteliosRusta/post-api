import { Router } from "express";
import {
  getAllPosts,
  getSinglePost,
  deletePost,
  createPost,
  updatePost,
} from "./posts.js";
import UploadImage from "../Midellwares/UploadImage.js";

const postsRouter = Router();

postsRouter
  .route("/")
  .get(getAllPosts)
  .post(UploadImage.single("image"), createPost);

postsRouter.route("/:id").get(getSinglePost).put(updatePost).delete(deletePost);

export default postsRouter;
