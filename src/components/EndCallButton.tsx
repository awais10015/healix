"use client";
import React from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from 'nextjs-toploader/app';

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
      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 ease-in-out active:scale-95 hover:cursor-pointer hover:scale-110"
      onClick={async () => {
        await call.endCall();

        await fetch("/api/meeting/delete", {
          method: "POST",
          body: JSON.stringify({ meetingId: call.id }),
        });

        router.push("/");
      }}
    >
      End Call For Everyone
    </button>
  );
};

export default EndCallButton;
