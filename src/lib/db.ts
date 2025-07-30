import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

// console.log("MONGODB_URL:", process.env.MONGODB_URL);

if (!MONGODB_URL) {
  throw new Error("Please define MONGODB_URL in your .env.local");
}

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Add custom type to globalThis
declare global {
  var mongoose: MongooseConn | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connect = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "hospital",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;

  // if (mongoose.connections[0].readyState) return;
  // await mongoose.connect(MONGODB_URL, {
  //   dbName: "hospital",
  // });
};
