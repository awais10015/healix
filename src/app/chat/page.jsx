import React, { Suspense } from "react";
import Chat from "./Chat";

const page = () => {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <Chat />
    </Suspense>
  );
};

export default page;
