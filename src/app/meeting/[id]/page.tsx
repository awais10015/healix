"use client";
import { Call } from "@stream-io/video-react-sdk";
import {
  StreamCallProvider,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState, use } from "react";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import Loader from "@/components/Loader";


const Meeting = ({ params }: { params: Promise<{ id: string }> }) => {
  const { user, isLoaded } = useUser();
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call|null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // ✅ Unwrap params
  const { id } = use(params);

  useEffect(() => {
    if (!client || !isLoaded || !user) return;
    const callInstance = client.call("default", id);
    setCall(callInstance);
  }, [client, isLoaded, user, id]);

  if (!call) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCallProvider call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCallProvider>
    </main>
  );
};

export default Meeting;
