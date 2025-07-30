import React, { Suspense } from "react";
import Layout from "./layout";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <Layout />
    </Suspense>
  );
};

export default Page;
