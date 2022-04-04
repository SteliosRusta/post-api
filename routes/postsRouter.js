import { Router } from "express";

const postsRouter = Router();

postsRouter
  .route("/")
  .get((req, res) => res.send("GET all  posts"))
  .post((req, res) => res.send("POST a post"));

postsRouter
  .route("/:id")
  .get((req, res) => res.send("GET a single post"))
  .put((req, res) => res.send("PUT a single post"))
  .delete((req, res) => res.send("DELETE a single post"));

  export default postsRouter;
