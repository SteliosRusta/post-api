import express from "express";
import postsRouter from "./routes/postsRouter.js";
import cors from "cors";
import { resolve } from "path";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(resolve("uploads")));
app.use("/posts", postsRouter);
app.get("/", (req, res) => res.send("Travel posts API"));
app.get("/uploads/:image", (req, res) => {
  res.sendFile(resolve(`./uploads/${req.params.image}`));
});

app.listen(port, (req, res) =>
  console.log(`Server is listening at port : ${port}`)
);
