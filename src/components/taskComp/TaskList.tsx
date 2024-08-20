import React from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import { ITask, IUser, TData } from "@/types/types";
import DragIndicator from "./DragIndicator";

type TTaskList = {
  column: string;
  cards: ITask[];
  setCards: React.Dispatch<React.SetStateAction<ITask[]>>;
  filtercards: ITask[];
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: ITask) => void;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
  ptojectData: TData[];
  users: IUser[];
};

const TaskList = ({
  column,
  cards,
  setCards,
  filtercards,
  handleDragStart,
  active,
  setActive,
  setopen,
  setTaskId,
  ptojectData,
  users,
}: TTaskList) => {
  const handleDragover = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators: HTMLElement[] = getIndicator();
    clearhighlights(indicators);
    const el = getNearestIndicator(e, indicators);

    el.elment.style.opacity = "1";
  };

  const getIndicator = (): HTMLElement[] => {
    const el = Array.from(
      document.querySelectorAll(`[data-column="${column}"]`)
    ) as HTMLElement[];
    return el;
  };

  const clearhighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicator();
    indicators.forEach((indicator) => (indicator.style.opacity = "0"));
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    ind: HTMLElement[]
  ) => {
    const el = ind.reduce(
      (closet, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + 50);
        if (offset < 0 && offset > closet.offset) {
          return { offset: offset, elment: child };
        } else return closet;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        elment: ind[ind.length - 1],
      }
    );
    return el;
  };

  const handleDragleave = () => {
    setActive(false);
    clearhighlights();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false);
    clearhighlights();

    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicator();
    const { elment } = getNearestIndicator(e, indicators);
    const before = elment.dataset.before || "-1";
    console.log("id " + cardId);
    console.log("in " + indicators);
    console.log("el " + elment);
    console.log("be " + before);

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c._id == cardId);

      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, status: column };

      copy = copy.filter((c) => c._id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) copy.push(cardToTransfer);
      else {
        const inertAtIndex = copy.findIndex((el) => el._id == before);

        if (inertAtIndex === undefined) return;
        copy.splice(inertAtIndex, 0, cardToTransfer);
      }
      console.log(copy);

      setCards(copy);
    }
  };

  return (
    <div
      onDragOver={handleDragover}
      onDragLeave={handleDragleave}
      onDrop={handleDragEnd}
      className={`h-full w-full transition-colors ${
        active ? " bg-neutral-800/50" : "bg-neutral-800/0"
      }`}
    >
      <DragIndicator beforeid="-1" column={column} />
      {filtercards.map((card) => (
        <Task
          key={card._id}
          id={card._id || ""}
          column={card.status}
          handleDragStart={handleDragStart}
          {...card}
          setopen={setopen}
          setTaskId={setTaskId}
        />
      ))}
      <AddTask
        column={column}
        setCards={setCards}
        ptojectData={ptojectData}
        users={users}
      />
    </div>
  );
};

export default TaskList;
