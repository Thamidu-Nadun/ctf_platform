import express from "express";
import instanceController from "./controller/instance.controller";
import userController from "./controller/user.controller";
import eventController from "./controller/event.controller";
import categoryController from "./controller/category.controller";
import challengeController from "./controller/challenge.controller";
import participantController from "./controller/participant.controller";
import submissionController from "./controller/submission.controller";
import environmentController from "./controller/environment.controller";
import fileController from "./controller/file.controller";
import proxyController from "./controller/proxy.controller";
import flagController from "./controller/flag.controller";
import hintController from "./controller/hint.controller";
import errorHandler from "./middleware/errorHandler";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
});

app.use("/event", eventController);
app.use("/instance", instanceController);
app.use("/user", userController);
app.use("/category", categoryController);
app.use("/challenge", challengeController);
app.use("/participant", participantController);
app.use("/submission", submissionController);
app.use("/env", environmentController);
app.use("/file", fileController);
app.use("/flag", flagController);
app.use("/hint", hintController);
app.use("/proxy", proxyController);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
