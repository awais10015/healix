"use server";
import { pusherServer } from "../pusher";
interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: string; // or Date
}
export const sendMessage = async (messageObj: ChatMessage): Promise<void> => {
  try {
    await pusherServer.trigger("chat-app", "upcomming-message", {
      message: messageObj,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
