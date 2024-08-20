import mongoose, { Schema, Document, Types } from "mongoose";
interface IProject extends Document {
  name: string;
  description?: string;
  status: string;
  manager: Types.ObjectId;
  duration: string;
  budget: number;
  startDate: Date;
  members: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  color: string;
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true },
  manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
  duration: { type: String, required: true },
  color: { type: String, required: true },
  budget: { type: Number, required: true },
  startDate: { type: Date, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Project =
  mongoose.models?.Project ||
  mongoose.model<IProject>("Project", projectSchema);

export default Project;
