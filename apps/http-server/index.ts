import express from "express";
import { userRouter } from "./routes/auth/auth";
import { userProfile } from "./routes/auth/profile";
import { userCard } from "./routes/memory/card";
import { cardController } from "./routes/memory/card.controller";

const app = express();

const PORT = 3000;
app.use(express.json());

app.use("/user", userRouter);
app.use("/profile", userProfile);
app.use("/card", userCard);
app.use('/', cardController)

app.listen(PORT);
