import express from "express";

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => res.send("you are connected"));

app.listen(port, (req, res) =>
  console.log(`Server is listening at port : ${port}`)
);
