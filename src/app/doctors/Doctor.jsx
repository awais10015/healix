"use client";
import React, { use, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'nextjs-toploader/app';
import { useUser } from "@clerk/nextjs";
import selectedUserContext from "../context/selectedUserContext";
import doctorContext from "../context/doctorContext";
import Loader from "@/components/Loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedOut,
} from "@clerk/nextjs";

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
        },
        opacity: 0,
        y: 300,
        duration: 0.8,
      });
    }, "");

    return () => ctx.revert();
  }, []);
  const router = useRouter();
  const { user } = useUser();
  const [doctors, setdoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorId, setDoctorId] = useState();
  const { setSelectedUser } = useContext(selectedUserContext);
  const { setDoctor } = useContext(doctorContext);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (docId, doc) => {
    console.log(docId)
    if (!user) {
      setOpenDialog(true);
    } else {
      handleChat(docId);
      setSelectedUser(doc);
      setDoctor(docId);
      router.push(`/chat?doctorId=${doc.id}`);
    }
  };

  const fetchDoctors = async () => {
    const res = await fetch("/api/doctors");
    const data = await res.json();
    setdoctors(data);
  };
  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setPatients(data);
  };
  useEffect(() => {
    fetchDoctors();
    fetchUsers();
  }, []);

  const handleChat = async (docId) => {
    if (user?.emailAddresses[0]?.emailAddress === "awais10015@gmail.com") {
      if (!doctorId || !docId) {
        console.error("Missing participant IDs");
        return;
      }
      const participants = [doctorId, docId];
      console.log(participants);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ participants }),
        });

        const newChat = await res.json();
        console.log("Chat ready:", newChat);
      } catch (error) {
        console.error("Chat creation failed:", error);
      }
    } else {
      if (!docId || !user?.id) {
        console.error("Missing participant IDs");
        return;
      }
      const participants = [docId, user.id];
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ participants }),
        });
        if (!res.ok) {
          throw new Error("Failed to create or fetch chat");
        }
        const newChat = await res.json();
      } catch (error) {
        console.error("Chat creation failed:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      {doctors.length === 0 ? (
        <Loader />
      ) : (
        <>
          {user?.emailAddresses[0]?.emailAddress === "awais10015@gmail.com" ? (
            <>
              {!doctorId ? (
                <div className="four flex flex-col justify-center items-center">
                  <h1 className="text-5xl mt-10 font-medium">Who Are You</h1>
                  <div className="doc grid min-h-[430px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-15">
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
                              className="hover:cursor-pointer object-cover w-full h-full duration-300 hover:scale-105 transition-all ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col justify-center gap-4  items-center w-full mt-5">
                          <div className="text-start">
                            <h2 className="text-xl font-semibold ">
                              {doc.name}
                            </h2>
                            <p className="text-md text-gray-400">
                              {doc.designation}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setDoctorId(doc.id);
                              setDoctor(doc.id);
                            }}
                            className="ml-auto hover:cursor-pointer hover:scale-105 bg-[#2563EB] text-white px-4 py-2 rounded-2xl hover:bg-[#1E40AF] transition"
                          >
                            Its Me
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="four flex flex-col justify-center items-center">
                  <h1 className="text-5xl mt-10 font-medium">
                    Chat With Patients
                  </h1>
                  <div className="flex  flex-wrap justify-center gap-6 p-6">
                    {patients.map((patient) => (
                      <div
                        key={patient._id}
                        className="w-full sm:w-[300px] bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col items-center p-5 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
                          <Image
                            src={patient.photo}
                            width={128}
                            height={128}
                            alt={patient.username}
                            className="hover:cursor-pointer object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white text-center">
                          {patient.username}
                        </h2>

                        <Link
                          href={`/chat?doctorId=${doctorId}`}
                          className="w-full mt-4"
                        >
                          <button
                            onClick={() => {
                              handleChat(patient.clerkId);
                              setSelectedUser(patient);
                            }}
                            className="hover:cursor-pointer hover:scale-105 w-full bg-[#2563EB] text-white py-2 rounded-xl hover:bg-[#1E40AF] transition-colors duration-300"
                          >
                            Chat
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="four flex flex-col justify-center items-center">
              <h1 className="text-5xl mt-10 font-medium">Meet the team</h1>
              <div className="doc min-h-[430px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-15">
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
                          className="hover:cursor-pointer object-cover w-full h-full duration-300 hover:scale-105 transition-all ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full mt-5">
                      <div className="text-start">
                        <h2 className="text-xl font-semibold ">{doc.name}</h2>
                        <p className="text-md text-gray-400">
                          {doc.designation}
                        </p>
                      </div>
                      {/* <Link href={`/chat?doctorId=${doc.id}`}> */}
                      <div>
                        <button
                          onClick={()=>{
                            handleClick(doc.id , doc)
                          }}
                          className="hover:cursor-pointer hover:scale-105 ml-auto bg-[#2563EB] text-white px-4 py-2 rounded-2xl hover:bg-[#1E40AF] transition"
                        >
                          Chat
                        </button>

                        
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Login Required</DialogTitle>
                              <DialogDescription>
                                You must be logged in to chat with a doctor.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end gap-4 mt-4">
                              {/* <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                              </DialogClose> */}
                              <SignedOut>
                                <SignInButton className="hover:cursor-pointer" />
                                <SignUpButton>
                                  <button className="bg-[#6c47ff] hover:cursor-pointer text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                                    Sign Up
                                  </button>
                                </SignUpButton>
                              </SignedOut>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      {/* </Link> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </>
  );
};

export default Doctor;
