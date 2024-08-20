// src/DayView.tsx

import React from "react";
import {
  format,
  eachHourOfInterval,
  startOfDay,
  endOfDay,
  isToday,
  isBefore,
} from "date-fns";

interface DayViewProps {
  currentDate: Date;
  events: { [key: string]: { [time: string]: string[] } };
  onAddEvent: (dateKey: string, time: string, event: string) => void;
  onEditEvent: (
    dateKey: string,
    time: string,
    index: number,
    event: string
  ) => void;
  onDeleteEvent: (dateKey: string, time: string, index: number) => void;
}

const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const dateKey = format(currentDate, "yyyy-MM-dd");
  const today = new Date();
  const isCurrentDay = isToday(currentDate);
  const isPastDay = isBefore(startOfDay(currentDate), startOfDay(today));

  return (
    <>
      <div className="flex items-center justify-center p-2">
        <h1
          className={`font-bold text-center text-lg ${
            isCurrentDay ? "text-indigo-300" : ""
          }`}
        >
          {format(currentDate, "EEEE d")}
        </h1>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-indigo-900">
          <tr>
            <th className="border border-gray-300 p-2 w-1/6">Time</th>
            <th className="border border-gray-300 p-2">Events</th>
          </tr>
        </thead>
        <tbody>
          {eachHourOfInterval({
            start: startOfDay(currentDate),
            end: endOfDay(currentDate),
          }).map((hour) => {
            const timeKey = format(hour, "HH:mm");
            return (
              <tr key={timeKey}>
                <td className="border border-gray-300 p-1">{timeKey}</td>
                <td
                  className={`border border-gray-300 p-1 align-top ${
                    isPastDay ? "bg-neutral-600 text-gray-100" : ""
                  }`}
                >
                  {events[dateKey]?.[timeKey]?.map((event, index) => (
                    <div
                      key={index}
                      className={`bg-gray-200 p-1 rounded mb-1 ${
                        isPastDay ? "bg-gray-300 text-gray-600" : ""
                      }`}
                    >
                      {event}
                    </div>
                  ))}
                  {!isPastDay && (
                    <button
                      onClick={() => onAddEvent(dateKey, timeKey, "New Event")}
                      className="text-blue-500 text-xs"
                    >
                      Add
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DayView;
