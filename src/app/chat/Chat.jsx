"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/modeToggle";
import { ArrowLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
   <div className="relative p-4 w-full min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">

  <div className="flex justify-between items-center mb-6">
    <div className="flex gap-2 items-center">
      
      <div className="block md:hidden">
        <SidebarTrigger />
      </div>

    
      <Link href="/doctors">
        <p className="inline-flex items-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors duration-200 cursor-pointer px-3 py-1 rounded-full border border-blue-600 shadow-sm text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </p>
      </Link>
    </div>

   
    <ModeToggle />
  </div>

  
  <h1 className="text-2xl font-semibold mb-4">Chat with Doctor</h1>

  <div className="flex flex-col gap-2 h-[450px] overflow-y-auto p-4 rounded-md border bg-gray-50 dark:bg-gray-900 shadow-inner scrollbar-hide">
    {Array.isArray(messages) && messages.length > 0 ? (
      messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md ${
            msg.senderId === user?.id
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 self-start"
          }`}
        >
          {msg.message}
        </div>
      ))
    ) : (
      <p className="text-sm text-gray-400 italic">No messages yet.</p>
    )}
  </div>

  
  <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white dark:bg-gray-900 z-20 p-4 border-t flex items-center gap-2 sm:px-6 md:px-10">
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-lg focus:outline-none shadow-sm text-sm"
      placeholder="Type your message..."
    />
    <button
      onClick={sendMessage}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium shadow"
    >
      Send
    </button>
  </div>
</div>

  );
}
