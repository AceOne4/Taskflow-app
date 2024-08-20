import React from "react";
import TaskDetails from "./TaskDetails";
import Comments from "./Comments";
import {
  getCommentsbyChannel,
  getTaskById,
  getUserById,
} from "@/utils/sevice-data";
import { auth } from "@/utils/auth";

type Tprops = {
  params: { taskId: string };
};

const TaskDetailsPage: React.FC<Tprops> = async ({ params }) => {
  const { taskId } = params;
  const theTask = await getTaskById(taskId);
  const taskHolder = await getUserById(theTask.assignedTo);
  const session = await auth();
  const comments = await getCommentsbyChannel(taskId);

  return (
    <div className="container mx-auto p-6">
      <TaskDetails task={theTask} holder={taskHolder} />
      <Comments comments={comments} taskId={taskId} session={session} />
    </div>
  );
};

export default TaskDetailsPage;
