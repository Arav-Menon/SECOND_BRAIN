import express from "express";
import { userRouter } from "./routes/auth/auth";
import { userProfile } from "./routes/auth/profile";
import { userCard } from "./routes/memory/card";
import { userCardController } from "./routes/memory/card.controller";
import { userTags } from "./routes/tags/tags";
import { userTagController } from "./routes/tags/tags.controller";

const app = express();

const PORT = 3000;
app.use(express.json());

app.use("/user", userRouter);
app.use("/profile", userProfile);
app.use("/card", userCard);
app.use("/updateCards", userCardController);
app.use("/tag", userTags);
app.use("/updateTags", userTagController);

app.listen(PORT);
