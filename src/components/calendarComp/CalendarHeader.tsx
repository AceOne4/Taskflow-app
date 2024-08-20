// src/CalendarHeader.tsx

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  onChangeView: (view: "month" | "week" | "day") => void;
  view: "month" | "week" | "day";
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevious,
  onNext,
  onChangeView,
  view,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="header flex flex-col items-center mb-4">
      <div className="flex justify-between items-center w-full mb-2">
        <button onClick={onPrevious} className="p-2 text-white rounded ">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h2 className="text-xl">
          {`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
        </h2>
        <button onClick={onNext} className="p-2 text-white rounded ">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="view-selector flex space-x-4">
        {["month", "week", "day"].map((viewType) => (
          <button
            key={viewType}
            onClick={() => onChangeView(viewType as "month" | "week" | "day")}
            className={`p-2 rounded ${
              view === viewType
                ? "bg-neutral-100 text-indigo-800"
                : " hover:bg-indigo-400 transition duration-600"
            }`}
          >
            {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
