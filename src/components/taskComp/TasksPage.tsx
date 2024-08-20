"use client";
import React, { useEffect, useState } from "react";
import Column from "./Column";
import Deletearea from "./Deletearea";
import { ITask, IUser, TData } from "@/types/types";
import Modal from "./Modal";

type Ttaskprops = {
  tasks: ITask[];
  ptojectData: TData[];
  users: IUser[];
};

const TasksPage: React.FC<Ttaskprops> = ({ tasks, ptojectData, users }) => {
  const [cards, setCards] = useState<ITask[]>([]);
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState<string>("");

  useEffect(() => {
    setCards(tasks);
  }, [tasks]);

  return (
    <div className="flex h-full w-full gap-3 relative">
      {["Unassigned", "To Do", "In Progress", "Completed"].map(
        (title, index) => {
          const columns = ["undone", "todo", "doing", "done"];
          const headingColors = [
            "text-neutral-500",
            "text-yellow-200",
            "text-blue-200",
            "text-emerald-200",
          ];
          return (
            <Column
              key={index}
              title={title}
              column={columns[index]}
              cards={cards}
              setCards={setCards}
              headingcolor={headingColors[index]}
              setOpen={setOpen}
              setTaskId={setTaskId}
              ptojectData={ptojectData}
              users={users}
            />
          );
        }
      )}
      <Deletearea setCards={setCards} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        cards={cards}
        taskId={taskId}
        projectData={ptojectData}
      />
    </div>
  );
};

export default TasksPage;
