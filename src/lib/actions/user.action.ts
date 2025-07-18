"use server";

import User from "../modals/user.modal";
import { connect } from "@/lib/db";


interface CreateUserInput {
  name: string;
  email: string;
  
}

export async function createUser(user: CreateUserInput) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Failed to create user");
  }
}
