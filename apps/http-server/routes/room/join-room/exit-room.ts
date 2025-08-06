import expres from "express";
import { middleware } from "../../../middleware";
import { prismaDb } from "@repo/db/prismaDb";

const userExitRoom = expres();

// userExitRoom.delete("/exitRoom/:roomId", middleware, async (req, res) => {
//   const userId = req.id;
//   const roomId = req.params.roomId;

//   try {
//     const findUserInRoom = await prismaDb.roomMembers.findUnique({
//       where: {
//         userId_roomId: {
//           id: userId,
//           roomId: roomId,
//         },
//       },
//     });

//     if (!findUserInRoom)
//       return res.status(404).json({ message: "User not found in that room" });

//     const exitRoom = await prismaDb.roomMembers.delete({
//       where: {
//         userId_roomId: {
//           userId: userId,
//           roomId: roomId,
//         },
//       },
//     });

//     res.status(200).json({
//       message: "User exited",
//       exitedUser: {
//         user: exitRoom.userId,
//         room: exitRoom.roomId,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });
