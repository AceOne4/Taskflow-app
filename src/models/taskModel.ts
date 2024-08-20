import mongoose, { Schema, Document, Types } from "mongoose";

interface ITask extends Document {
  projectId: Types.ObjectId;
  title: string;
  description?: string;
  assignedTo?: Types.ObjectId;
  dueDate?: Date;
  priority: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  progress: number;
}

const taskSchema = new Schema<ITask>({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  dueDate: { type: Date },
  priority: { type: String, required: true },
  progress: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Task = mongoose.models?.Task || mongoose.model<ITask>("Task", taskSchema);
export default Task;
