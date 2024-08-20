export interface IActivityLog {
  _id: string;
  userId: string;
  action: string;
  details: Record<string, unknown>;
  timestamp: string | Date;
}
export interface INotification {
  _id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  timestamp: string | Date;
}
export interface IProject {
  _id?: string;
  name: string;
  description?: string;
  status: string;
  manager: string;
  duration: string;
  budget: number;
  startDate: Date;
  members: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
  color?: string;
}
export interface ITask {
  _id?: string;
  projectId: string;
  title: string;
  description?: string;
  assignedTo?: string;
  dueDate?: string | Date;
  priority: string;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  progress?: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  profilePicture?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type TData = {
  id: string;
  name: string;
  color: string;
};

export interface IMessage {
  _id?: string;
  sender: string;
  receiver: string;
  content: string;
  type: "text" | "image" | "file";
  createdAt: Date;
  channel: string;
  isReaded: boolean;
}

export interface IComment {
  _id?: string;
  sender: string;
  senderName: string;
  content: string;
  taskId: string;
  createdAt: Date;
}
