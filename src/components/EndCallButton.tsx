"use client";
import React, { useContext } from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const router = useRouter();
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <button
      className="bg-red-600 text-white"
      onClick={async () => {
        await call.endCall();
        
        await fetch("/api/meeting/delete", {
          method: "POST",
          body: JSON.stringify({ meetingId: call.id }),
        });
        router.push("/");
      }}
    >
      {" "}
      End Call For Everyone
    </button>
  );
};

export default EndCallButton;
