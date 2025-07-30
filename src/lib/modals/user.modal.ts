import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  photo: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    enum: ["doctor", "patient"],
    default: "patient",
  },
});

const User = models?.User || model("User", UserSchema);
export default User;






// // lib / modals / user.modal.ts;
// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   clerkId: string;
//   role: "doctor" | "patient" | "admin" | "lab";
//   photo?: string;
//   firstName?: string;
//   lastName?: string;
//   username?: string;
// }

// const UserSchema = new Schema<IUser>(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     clerkId: { type: String, required: true, unique: true },
//     role: {
//       type: String,
//       required: true,
//       enum: ["doctor", "patient", "admin", "lab"],
//     },
//     photo: {
//       type: String,
//       unique: true,
//     },
//     firstName: {
//       type: String,
//     },
//     lastName: {
//       type: String,
//     },
//     username: {
//       type: String,
//       unique: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.User ||
//   mongoose.model<IUser>("User", UserSchema);
