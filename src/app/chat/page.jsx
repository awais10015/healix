import React, { Suspense } from "react";
import Layout from "./layout";
import Loader from "@/components/Loader";

export const metadata = {
  title: "Healix-Chat",
  description: "Where care meets innovation",
};
const Page = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Layout />
    </Suspense>
  );
};

export default Page;
