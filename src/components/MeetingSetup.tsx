"use client";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used inside StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Meeting Setup
        </h1>

        <div className="rounded-xl overflow-hidden shadow flex justify-center items-center">
          <VideoPreview />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={isMicCamToggledOn}
              onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            Join With Mic & Cam Off
          </label>
          <DeviceSettings />
        </div>

        <Button
          className="w-full bg-green-600"
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
