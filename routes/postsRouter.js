import { Router } from "express";
import {
  getAllPosts,
  getSinglePost,
  deletePost,
  createPost,
  updatePost,
} from "./posts.js";

const postsRouter = Router();

postsRouter.route("/").get(getAllPosts).post(createPost);

postsRouter.route("/:id").get(getSinglePost).put(updatePost).delete(deletePost);

export default postsRouter;
