import express from "express";
import mongoose from "./db/dbCon.js";
import userRouter from "./modules/user/user.routes.js";
import messageRouter from "./modules/message/message.routes.js";
import { errorHandler } from "./modules/errHandling/errHandling.js";

const app = express();
const port = 3000;
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
