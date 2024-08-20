import { ITask, IUser } from "@/types/types";
import { getStatusColor, getStatusLabel } from "@/utils/helper";
import React from "react";

type TaskDetailsProps = {
  task: ITask;
  holder: IUser;
};

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, holder }) => {
  return (
    <div className="   w-full border-b  ">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
      <div className=" shadow-sm     rounded-lg p-6 mb-6 bg-neutral-800  shadow-indigo-200">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">
          Task Details
        </h2>
        <p>
          <strong>Status:</strong>{" "}
          <span className={getStatusColor(task.status)}>
            {getStatusLabel(task.status)}
          </span>
        </p>
        <p>
          <strong>Assigned To:</strong> {holder.name}
        </p>
        <p>
          <strong>Due Date:</strong>{" "}
          {new Date(task.dueDate as any).toLocaleDateString()}
        </p>
        <p className="mt-4">
          <strong>Description:</strong>
        </p>
        <p>{task.description}</p>
      </div>
    </div>
  );
};

export default TaskDetails;
