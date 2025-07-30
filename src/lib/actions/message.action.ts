"use server";
import { pusherServer } from "../pusher";

export const sendMessage = async (messageObj: any) => {
  try {
    await pusherServer.trigger("chat-app", "upcomming-message", {
      message: messageObj,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
