"use client";
import React, { useState } from "react";
import { Ttasks } from "./Column";
import { FireIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ITask } from "@/types/types";
import { removeTask } from "@/utils/actions";
function Deletearea({
  setCards,
}: {
  setCards: React.Dispatch<React.SetStateAction<ITask[]>>;
}) {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    await removeTask(cardId);
    setCards((pv) => pv.filter((c) => c._id !== cardId));
    setActive(false);
  };
  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? (
        <FireIcon className="h-8 w-8 animate-bounce" />
      ) : (
        <TrashIcon className="h-8 w-8" />
      )}
    </div>
  );
}

export default Deletearea;
