// src/WeekView.tsx

import React from "react";
import {
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachHourOfInterval,
  startOfDay,
  endOfDay,
  isToday,
  isBefore,
  isAfter,
} from "date-fns";

interface WeekViewProps {
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

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const start = startOfWeek(currentDate);
  const end = endOfWeek(currentDate);
  const daysInWeek = eachDayOfInterval({ start, end });
  const today = new Date();

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {daysInWeek.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const isCurrentDay = isToday(day);
            const isPastDay = isBefore(startOfDay(day), startOfDay(today));

            return (
              <th
                key={dateKey}
                className={`border border-gray-300 bg-indigo-900 p-2 ${
                  isCurrentDay
                    ? " text-indigo-200 border-blue-300"
                    : isPastDay
                    ? "bg-gray-200 text-gray-500"
                    : ""
                }`}
              >
                {format(day, "EEE d")}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {eachHourOfInterval({
          start: startOfDay(start),
          end: endOfDay(start),
        }).map((hour) => {
          const timeKey = format(hour, "HH:mm");
          return (
            <tr key={timeKey}>
              {daysInWeek.map((day) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const isCurrentDay = isToday(day);
                const isPastDay = isBefore(startOfDay(day), startOfDay(today));

                return (
                  <td
                    key={dateKey}
                    className={`border border-gray-300 p-1 align-top ${
                      isPastDay ? "bg-neutral-600 text-gray-100" : ""
                    }`}
                  >
                    <div className="text-xs">{timeKey}</div>
                    {events[dateKey]?.[timeKey]?.map((event, index) => (
                      <div
                        key={index}
                        className={`bg-neutral-400 p-1 rounded mb-1 text-xs ${
                          isPastDay ? "bg-gray-300 text-gray-600" : ""
                        }`}
                      >
                        {event}
                      </div>
                    ))}
                    {!isPastDay && (
                      <button
                        onClick={() =>
                          onAddEvent(dateKey, timeKey, "New Event")
                        }
                        className="text-blue-500 text-xs"
                      >
                        Add
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WeekView;
