
"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";


const page = () => {
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState();

  const client = useStreamVideoClient();
  const { user } = useUser();
  const router = useRouter();

  const createMeeting = async () => {
    const res = await fetch("/api/meeting/active");
    if (!client || !user) return;
    if (res.ok) {
      const data = await res.json();
      router.push(`/meeting/${data.meetingId}`);
      return;
    } else {
      try {
        const id = crypto.randomUUID();
        const call = client.call("default", id);
        if (!call) throw new Error("Failed to Create Call");
        const startsAt =
          values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = values.description || "Instant Meeting";
        await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom: {
              description,
            },
          },
        });
        setCallDetails(call);
        if (!values.description) {
          await fetch("/api/meeting/create", {
            method: "POST",
            body: JSON.stringify({
              meetingId: id,
              createdBy: user.id,
              description,
              startsAt,
            }),
          });
          router.push(`meeting/${call.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white relative top-50"
        onClick={createMeeting}
      >
        StartCall
      </button>
    </div>
  );
};

export default page;
