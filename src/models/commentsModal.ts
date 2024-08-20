import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Comment model
interface IComment extends Document {
  sender: Schema.Types.ObjectId;
  senderName: string;
  content: string;
  taskId: Schema.Types.ObjectId;
  createdAt: Date;
}

// Define the schema for the Comment model
const CommentSchema: Schema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: {
      type: String,
      required: true,
    },
    senderName: { type: String, required: true },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create and export the Comment model
const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
