// src/MonthView.tsx

import React from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import CalendarDay from "./CalendarDay";

interface MonthViewProps {
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

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  // Calculate the start and end of the month
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);

  // Calculate the start of the week for the month view
  const startWeek = startOfWeek(start, { weekStartsOn: 0 }); // Assuming Sunday starts the week
  const endWeek = endOfWeek(end, { weekStartsOn: 0 });

  // Generate all days within the visible weeks
  const daysInMonth = eachDayOfInterval({ start: startWeek, end: endWeek });
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <div className="grid grid-cols-7 text-center">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="font-bold py-3 border border-gray-300 bg-indigo-900"
          >
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          return (
            <CalendarDay
              key={dateKey}
              day={day.getDate()}
              dateKey={dateKey}
              events={events[dateKey] || {}}
              onAddEvent={onAddEvent}
              onEditEvent={onEditEvent}
              onDeleteEvent={onDeleteEvent}
              view="month"
            />
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
