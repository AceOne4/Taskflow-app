import React, { useState } from "react";
import TaskList from "./TaskList";
import ColumnHeader from "./ColumnHeader";
import { ITask, IUser, TData } from "@/types/types";

export type Ttasks = {
  id: string;
  column: string;
  title: string;
};

type TColumn = {
  title: string;
  headingcolor: string;
  column: string;
  cards: ITask[];
  setCards: React.Dispatch<React.SetStateAction<ITask[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
  ptojectData: TData[];
  users: IUser[];
};

function Column({
  title,
  headingcolor,
  column,
  cards,
  setCards,
  setOpen,
  setTaskId,
  ptojectData,
  users,
}: TColumn) {
  const [active, setActive] = useState(false);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: { title: string; _id?: string; status: string }
  ) => {
    if (!card) return;
    e.dataTransfer.setData("cardId", card._id || "");
  };

  const filtercards = cards.filter((c) => c.status === column);

  return (
    <div className="w-56 shrink-0">
      <ColumnHeader
        title={title}
        headingcolor={headingcolor}
        count={filtercards.length}
      />

      <TaskList
        column={column}
        cards={cards}
        setCards={setCards}
        filtercards={filtercards}
        handleDragStart={handleDragStart}
        active={active}
        setActive={setActive}
        setopen={setOpen}
        setTaskId={setTaskId}
        ptojectData={ptojectData}
        users={users}
      />
    </div>
  );
}

export default Column;
