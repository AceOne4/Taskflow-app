import React from "react";
import DragIndicator from "./DragIndicator";
import { motion } from "framer-motion";
import { ITask } from "@/types/types";

type Tprops = {
  id: string;
  title: string;
  column: string;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: ITask) => void;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
} & Omit<ITask, "_id" | "title" | "status">;

function Task({
  setTaskId,
  setopen,
  id,
  title,
  column,
  handleDragStart,
  ...cardProps
}: Tprops) {
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragStart(e, { ...cardProps, _id: id, title, status: column });
  };

  return (
    <>
      <DragIndicator beforeid={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable
        onDragStart={(e) =>
          handleDrag(e as unknown as React.DragEvent<HTMLDivElement>)
        }
        onDoubleClick={() => {
          setopen(true);
          setTaskId(id);
        }}
        className="cursor-grab rounded border border-neutral-700 bg-indigo-900 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
}

export default Task;
