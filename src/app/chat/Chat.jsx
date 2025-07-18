"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId") || "";

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chat/get", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          partnerId: doctorId,
        }),
      });

      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        const text = await res.text();
        console.error("Fetch failed:", text);
        setMessages([]); // avoid crash
        return;
      }

      const data = await res.json();

      // Make sure it's an array
      if (!Array.isArray(data)) {
        console.error("Expected array, got:", data);
        setMessages([]);
        return;
      }

      setMessages(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!message) return;
    await fetch("/api/chat/send", {
      method: "POST",
      body: JSON.stringify({
        senderId: user?.id,
        receiverId: doctorId,
        message,
      }),
    });
    setMessage("");
    fetchMessages();
  };

  useEffect(() => {
    if (doctorId) fetchMessages();
  }, [doctorId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Chat with Doctor</h1>

      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto border p-2 rounded">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded ${
                msg.senderId === user?.id
                  ? "bg-blue-100 self-end"
                  : "bg-gray-100 self-start"
              }`}
            >
              {msg.message}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No messages yet.</p>
        )}
      </div>

      <div className="mt-4 flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 ml-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
