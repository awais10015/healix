"use client";
import React, { useEffect, useState, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/modeToggle";
import { ArrowLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { pusherClient } from "@/lib/pusher";
import { sendMessage } from "@/lib/actions/message.action";
import selectedUserContext from "../context/selectedUserContext";
import { FiSend } from "react-icons/fi";
import { FaVideo } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ChatLoading from "@/components/ChatLoading";
import { useRouter } from "nextjs-toploader/app";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import doctorContext from "../context/doctorContext";
import Loader from "@/components/Loader";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

export default function ChatPage() {
  const [chats, setChats] = useState();
  const [chat, setChat] = useState();
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { user } = useUser();
  const searchParams = useSearchParams();

  const doctorId = searchParams.get("doctorId") || "";
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const { selectedUser } = useContext(selectedUserContext);

  const { doctor } = useContext(doctorContext);
  const [callParticipants, setCallParticipants] = useState([]);

  const [messageSentState, setMessageSentState] = useState(true);
  //pusher useeffect
  useEffect(() => {
    const channel = pusherClient.subscribe("chat-app");

    const handler = (data) => {
      setMessage((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        data.message,
      ]);
    };

    const meetingHandler = (data) => {
      toast("New Meeting", {
        description: `${data.message}`,
        action: {
          label: "Join Meeting",
          onClick: () => {
            createMeeting();
          },
        },
      });
    };
    channel.bind("meeting-created", meetingHandler);
    channel.bind("upcomming-message", handler);

    return () => {
      channel.unbind("upcomming-message", handler);
      channel.unbind("meeting-created", meetingHandler);
      pusherClient.unsubscribe("chat-app");
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    let newSenderId = "";
    let newReceiverId = "";

    if (user?.emailAddresses[0]?.emailAddress === "awais10015@gmail.com") {
      newSenderId = doctorId;
      newReceiverId = selectedUser?.clerkId || "";
      setCallParticipants([doctor?.toString(), selectedUser?.clerkId]);
    } else {
      newSenderId = user.id;
      newReceiverId = doctorId;
      setCallParticipants([doctor?.toString(), user.id]);
    }

    setSenderId(newSenderId);
    setReceiverId(newReceiverId);

    const fetchChats = async () => {
      const res = await fetch("/api/chat");
      const data = await res.json();
      setChats(data);

      const filteredChats = data.filter(
        (chat) =>
          chat.participants.includes(newSenderId) &&
          chat.participants.includes(newReceiverId)
      );

      if (filteredChats.length > 0) {
        setChat(filteredChats[0]._id);
        setMessage(filteredChats[0].messages);
      } else {
        setChat(null);
        setMessage([]);
      }
    };

    if (newSenderId && newReceiverId) {
      fetchChats();
    }
  }, [user, doctorId, selectedUser]);

  const submitHandler = async () => {
    if (!text.trim()) return;

    if (!chat) {
      console.error("No valid chat found");
      return;
    }
    const chatId = chat;
    try {
      setMessageSentState(false);
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId, senderId, receiverId, text }),
      });

      if (!res.ok) {
        console.error("Failed to send message");
        setMessageSentState(true);
        return;
      }
      const newMessage = await res.json();
      setMessages((prev) => [newMessage, ...prev]);

      await sendMessage(newMessage);

      setText("");
      setMessageSentState(true);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState();

  const client = useStreamVideoClient();
  const router = useRouter();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      const res = await fetch("/api/meeting/active");
      if (res.ok) {
        const data = await res.json();
        for (const meeting of data) {
          if (
            user?.emailAddresses[0]?.emailAddress === "awais10015@gmail.com"
          ) {
            if (
              callParticipants.every((item) =>
                meeting.participants.includes(item)
              ) &&
              meeting?.participants?.includes(doctor.toString())
            ) {
              console.log("User already in active meeting:", meeting.meetingId);
              router.push(`/meeting/${meeting.meetingId}`);
              return;
            }
          } else if (
            callParticipants.every((item) =>
              meeting.participants.includes(item)
            ) &&
            meeting?.participants?.includes(user.id)
          ) {
            console.log("User already in active meeting:", meeting.meetingId);
            router.push(`/meeting/${meeting.meetingId}`);
            return;
          }
        }
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");

      const startsAt = values.dateTime.toISOString();
      const description = values.description || "Instant Meeting";
      const participants = callParticipants;

      // Create Stream call
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      await fetch("/api/meeting/create", {
        method: "POST",
        body: JSON.stringify({
          meetingId: id,
          createdBy: user.id,
          description,
          startsAt,
          participants,
        }),
      });

      router.push(`/meeting/${id}`);
    } catch (error) {
      console.error("Error in meeting flow:", error);
    }
  };

  return (
    <>
      <div className="relative p-4 w-full min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center">
            <div className="block md:hidden">
              <SidebarTrigger />
            </div>

            <Link href="/doctors">
              <span className="inline-flex items-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-200 px-4 py-2 rounded-full border border-blue-600 shadow-sm text-sm font-medium hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95">
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </span>
            </Link>
          </div>

          <div className="flex gap-5">
            <button
              className="p-2 bg-blue-500 text-white rounded-full hover:cursor-pointer hover:scale-105"
              onClick={createMeeting}
              disabled={
                !callParticipants.length || callParticipants.includes(undefined)
              }
            >
              <FaVideo size={20} />
            </button>
            <ModeToggle />
          </div>
        </div>
        {!chat ? (
          <>
            <ChatLoading />
          </>
        ) : (
          <>
            <div
              id="chat-box"
              className="flex flex-col gap-2 h-[490px] overflow-y-auto p-4 rounded-md border-none bg-gray-50 dark:bg-gray-900 shadow-inner scrollbar-hide"
            >
              {Array.isArray(message) && message.length > 0 ? (
                message.map((msg, i) => {
                  let bubbleStyle = "";

                  let isDoctor =
                    msg.senderId === doctorId &&
                    user?.emailAddresses[0]?.emailAddress ===
                      "awais10015@gmail.com";

                  let isUser = selectedUser?.clerkId === user?.clerkId;

                  if (isDoctor) {
                    bubbleStyle =
                      "bg-blue-500 text-white rounded-t-4xl rounded-bl-4xl self-end";
                  } else if (
                    isUser &&
                    ["1", "2", "3", "4", "5", "6"].includes(msg.receiverId)
                  ) {
                    bubbleStyle =
                      "bg-blue-500 text-white rounded-t-4xl rounded-bl-4xl self-end";
                  } else {
                    bubbleStyle =
                      "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-t-4xl rounded-br-4xl self-start";
                  }

                  return (
                    <div
                      key={i}
                      className={` max-w-xs px-5 py-3  text-sm shadow-md ${bubbleStyle}`}
                    >
                      <div className="text-md font-medium mb-3">{msg.text}</div>

                      <div className=" bottom-1 right-2 text-[10px] text-black">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="flex space-x-1 mb-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                  <p className="text-gray-500 text-lg">No messages yet</p>
                </div>
              )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white dark:bg-gray-900 z-20 p-4  flex items-center gap-2 sm:px-6 md:px-10">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-lg focus:outline-none shadow-sm text-sm"
                placeholder="Type your message..."
              />

              {messageSentState ? (
                <button
                  onClick={submitHandler}
                  className="group p-2 hover:cursor-pointer bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all ease-in-out hover:scale-110"
                >
                  <FiSend className="w-5 h-5 transition-all ease-in-out hover:scale-110" />
                </button>
              ) : (
                <div className="group mb-1 ml-2 text-white rounded-full transition-all ease-in-out hover:scale-110">
                  <Spin indicator={<LoadingOutlined spin />} size="large" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
