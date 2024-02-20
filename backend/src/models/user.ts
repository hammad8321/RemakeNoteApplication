// import { InferSchemaType, Schema, model } from "mongoose";

// const noteSchema = new Schema(
//   {
//     title: { type: String, requires: true },
//     text: { type: String },
//   },
//   { timestamps: true }
// );

// type Note = InferSchemaType<typeof noteSchema>;

// export default model<Note>("Note", noteSchema);

import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, select: false },
  password: { type: String, required: true, select: false },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
