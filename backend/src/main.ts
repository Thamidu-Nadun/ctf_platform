import express from "express";
import instanceController from "./controller/instanceController";
import errorHandler from "./middleware/errorHandler";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
});

app.use("/instance", instanceController);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
