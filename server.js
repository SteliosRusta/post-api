import express from "express";
import res from "express/lib/response.js";
import postsRouter from "./routes/postsRouter.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/posts", postsRouter);
app.get("/", (req, res) => res.send("Travel posts API"));

app.listen(port, (req, res) =>
  console.log(`Server is listening at port : ${port}`)
);
