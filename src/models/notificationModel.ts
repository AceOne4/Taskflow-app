import mongoose, { Schema, Document, Types } from "mongoose";

interface INotification extends Document {
  userId: Types.ObjectId;
  type: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

const notificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

const Notification =
  mongoose.models?.Notification ||
  mongoose.model<INotification>("Task", notificationSchema);
export default Notification;
