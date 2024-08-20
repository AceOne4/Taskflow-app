import mongoose, { Schema, Document, Types } from "mongoose";

interface IActivityLog extends Document {
  userId: Types.ObjectId;
  action: string;
  details: Record<string, unknown>;
  timestamp: Date;
}

const activityLogSchema = new Schema<IActivityLog>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  details: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ActivityLog =
  mongoose.models?.ActivityLog ||
  mongoose.model<IActivityLog>("Project", activityLogSchema);

export default ActivityLog;
