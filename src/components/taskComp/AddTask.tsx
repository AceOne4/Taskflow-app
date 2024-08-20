import React, { useState } from "react";
import { Ttasks } from "./Column";
import { PlusIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { ITask, IUser, TData } from "@/types/types";
import Select from "react-select";
import NewTaskForm from "./NewTaskForm";
function AddTask({
  column,
  setCards,
  ptojectData,
  users,
}: {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<ITask[]>>;
  ptojectData: TData[];
  users: IUser[];
}) {
  const [add, setAdd] = useState(false);

  return (
    <>
      {add ? (
        <>
          <NewTaskForm
            column={column}
            projectData={ptojectData}
            users={users}
            setAdd={setAdd}
          />
        </>
      ) : (
        <motion.button
          onClick={() => {
            setAdd(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Task</span> <PlusIcon />
        </motion.button>
      )}
    </>
  );
}

export default AddTask;
