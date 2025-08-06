import express from "express";
import { userRouter } from "./routes/auth/auth";
import { userProfile } from "./routes/auth/profile";
import { userCard } from "./routes/memory/card";
import { userCardController } from "./routes/memory/card.controller";
import { userTags } from "./routes/tags/tags";
import { userTagController } from "./routes/tags/tags.controller";
import { userRoomRouter } from "./routes/room/create-room/room";
import { userRoomController } from "./routes/room/create-room/room.controller";
import { userRoomCard } from "./routes/room/create-card/room-card";
import { userJoinRoom } from "./routes/room/join-room/join-room";
import { getUserRoomCard } from "./routes/room/create-card/get-card";

const app = express();

const PORT = 3000;
app.use(express.json());

app.use("/user", userRouter);
app.use("/profile", userProfile);
app.use("/card", userCard);
app.use("/updateCards", userCardController);
app.use("/tag", userTags);
app.use("/updateTags", userTagController);
app.use("/room", userRoomRouter);
app.use("/controller", userRoomController);
app.use("/joinRoom", userJoinRoom);
app.use("/fetchCard", userRoomCard);
app.use("/roomCard", getUserRoomCard);

app.listen(PORT);
