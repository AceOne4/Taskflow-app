import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  islogin: boolean;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  islogin: { type: Boolean, default: false },
});

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);

export default User;
