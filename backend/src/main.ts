import express from "express";
import instanceController from "./controller/instance.controller";
import userController from "./controller/user.controller";
import eventController from "./controller/event.controller";
import environmentController from "./controller/environment.controller";
import errorHandler from "./middleware/errorHandler";
import "dotenv/config";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
});

app.use("/event", eventController);
app.use("/instance", instanceController);
app.use("/user", userController);
app.use("/env", environmentController);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
