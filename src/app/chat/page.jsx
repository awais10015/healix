import React, { Suspense } from "react";
import Layout from "./layout";
export const metadata = {
  title: "Healix-Chat",
  description: "Where care meets innovation",
};
const Page = () => {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <Layout />
    </Suspense>
  );
};

export default Page;
