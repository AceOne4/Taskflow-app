// src/CalendarDay.tsx

import React, { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/20/solid";
import { isToday, isBefore, startOfDay } from "date-fns";

interface CalendarDayProps {
  day: number;
  dateKey: string;
  events: { [time: string]: string[] };
  onAddEvent: (dateKey: string, time: string, event: string) => void;
  onEditEvent: (
    dateKey: string,
    time: string,
    index: number,
    event: string
  ) => void;
  onDeleteEvent: (dateKey: string, time: string, index: number) => void;
  view: "month" | "week" | "day";
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  dateKey,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  view,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editEvent, setEditEvent] = useState("");

  // Check if the day is today
  const today = new Date();
  const isCurrentDay = isToday(new Date(dateKey));
  const isPastDay = isBefore(startOfDay(new Date(dateKey)), startOfDay(today));

  const handleAddEvent = () => {
    if (newEvent.trim() !== "") {
      onAddEvent(dateKey, "", newEvent);
      setNewEvent("");
      setIsAdding(false);
    }
  };

  const handleEditEvent = (index: number) => {
    if (editEvent.trim() !== "") {
      onEditEvent(dateKey, "", index, editEvent);
      setEditIndex(null);
      setEditEvent("");
    }
  };

  return (
    <div
      className={`day h-32 flex flex-col items-center border border-neutral-400 p-2 relative ${
        isPastDay ? "bg-neutral-600 text-gray-100" : ""
      } ${isCurrentDay ? "border-indigo-300" : ""}`}
    >
      <div className={`font-bold ${isCurrentDay ? "text-indigo-300" : ""}`}>
        {day}
      </div>
      {Object.keys(events).length > 0 &&
        Object.keys(events).map((time) => (
          <div
            key={time}
            className={`text-xs mt-1 bg-neutral-500 p-1 rounded relative w-full ${
              isPastDay ? "bg-gray-300 text-gray-600" : ""
            }`}
          >
            {editIndex !== null ? (
              <input
                type="text"
                value={editEvent}
                onChange={(e) => setEditEvent(e.target.value)}
                onBlur={() => handleEditEvent(editIndex)}
                className="text-xs mt-1 p-1 rounded bg-neutral-800"
                disabled={isPastDay}
              />
            ) : (
              <>
                {events &&
                  events[time].map((event, index) => (
                    <div key={index}>
                      {event}
                      <button
                        onClick={() => {
                          if (!isPastDay) {
                            setEditIndex(index);
                            setEditEvent(event);
                          }
                        }}
                        className={`ml-2 text-xs ${
                          isPastDay ? "text-gray-400" : "text-indigo-500"
                        }`}
                        disabled={isPastDay}
                      >
                        <PencilSquareIcon className="w-2 h-2" />
                      </button>
                      <button
                        onClick={() => {
                          if (!isPastDay) onDeleteEvent(dateKey, "", index);
                        }}
                        className={`ml-2 text-xs ${
                          isPastDay ? "text-gray-400" : "text-red-500"
                        }`}
                        disabled={isPastDay}
                      >
                        <ArchiveBoxXMarkIcon className="w-2 h-2" />
                      </button>
                    </div>
                  ))}
              </>
            )}
          </div>
        ))}
      {isAdding && !isPastDay ? (
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Add event"
            className="text-xs mt-1 bg-neutral-200 p-1 rounded w-full"
            disabled={isPastDay}
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleAddEvent}
              className="text-xs bg-indigo-400 text-white p-1 rounded"
              disabled={isPastDay}
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="text-xs bg-red-500 text-white p-1 rounded"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        !isPastDay && (
          <button
            onClick={() => setIsAdding(true)}
            className="mt-2 text-blue-500"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        )
      )}
    </div>
  );
};

export default CalendarDay;
