import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col">
      {/* Main Video Area */}
      <div className="flex flex-1 relative">
        {/* Call Layout */}
        <div className="flex-grow flex justify-center items-center">
          <div className="w-full max-w-[1000px]">
            <CallLayout />
          </div>
        </div>

        {/* Participants Sidebar */}
        <div
          style={{ height: "calc(100vh - 86px)" }}
          className={cn("ml-2", {
            hidden: !showParticipants,
            block: showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Controls and Layout Switcher */}
      <div className="flex items-center justify-between gap-4 px-4 py-2 border-t">
        <CallControls />

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <LayoutList className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["grid", "speaker-left", "speaker-right"].map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setLayout(item as CallLayoutType)}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <CallStatsButton />

          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <Users />
          </button>

          <EndCallButton/>
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
