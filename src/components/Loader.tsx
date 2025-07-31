import React from "react";
import Image from "next/image";
const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src="/Loader.gif" alt="loading..." width={150} height={150} />
    </div>
  );
};

export default Loader;
