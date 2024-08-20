import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  content: string;
  type: "text" | "image" | "file";
  createdAt: Date;
  channel: string;
  isReaded: boolean;
}

const MessageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ["text", "image", "file"], default: "text" },
  createdAt: { type: Date, default: Date.now },
  channel: { type: String, required: true },
  isReaded: { type: Boolean, default: false },
});

const Message =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
