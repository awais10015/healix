"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Doctor = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".doc", {
        scrollTrigger: {
          trigger: ".doc",
          scroller: "body",
          start: "top 100%",
          end: "top 0%",
          // scrub: true,
          //   markers:true
        },
        opacity: 0,
        y: 300,
        duration: 0.8,
      });
    }, "");

    return () => ctx.revert();
  }, []);

  const doctors = [
    {
      id: 1,
      image: "/doc1.png",
      name: "Dr. Ethan Ross",
      designation: "Orthopedic Surgeon",
    },
    {
      id: 2,
      image: "/doc2.png",
      name: "Dr. Benjamin Stone",
      designation: "Nephrologist",
    },
    {
      id: 3,
      image: "/doc3.png",
      name: "Dr. Aiden Brooks",
      designation: "Radiologist",
    },
    {
      id: 4,
      image: "/doc4.png",
      name: "Dr. James Carter",
      designation: "Pulmonologist",
    },
    {
      id: 5,
      image: "/doc5.png",
      name: "Dr. Elijah Brown",
      designation: "ENT Specialist",
    },
    {
      id: 6,
      image: "/doc6.png",
      name: "Dr. Noah Kim",
      designation: "Endocrinologist",
    },
  ];
  return (
    <>
      <div className="four flex flex-col justify-center items-center">
        <h1 className="text-5xl mt-10 font-medium">Meet the team</h1>
        <div className="doc grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-15">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className=" rounded-2xl p-6 transition flex flex-col items-center text-center"
            >
              <div className="bg-[#F0F5F6] rounded-4xl shadow transition overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={doc.image}
                    width={500}
                    height={500}
                    alt={doc.name}
                    className="object-cover w-full h-full duration-300 hover:scale-105 transition-all ease-in-out"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center w-full mt-5">
                <div className="text-start">
                  <h2 className="text-xl font-semibold ">
                    {doc.name}
                  </h2>
                  <p className="text-md text-gray-400">{doc.designation}</p>
                </div>
                <Link href={`/chat?doctorId=${doc.id}`}>
                  <button className="ml-auto bg-[#2563EB] text-white px-4 py-2 rounded-2xl hover:bg-[#1E40AF] transition">
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctor;
