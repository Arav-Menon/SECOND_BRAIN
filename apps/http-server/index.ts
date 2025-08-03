import express from "express";
import { userRouter } from "./routes/auth/auth";
import { userProfile } from "./routes/auth/profile";

const app = express();

const PORT = 3000;
app.use(express.json());

app.use("/user", userRouter);
app.use("/profile", userProfile);

app.listen(PORT);
