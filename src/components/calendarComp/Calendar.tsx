// src/Calendar.tsx
"use client"; // src/Calendar.tsx

import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import { addDays } from "date-fns";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<{
    [key: string]: { [time: string]: string[] };
  }>({
    "2024-07-05": { "09:00": ["Birthday Party"] },
    "2024-07-12": { "14:00": ["Meeting"] },
    "2024-07-20": { "10:00": ["Conference"] },
  });
  const [view, setView] = useState<"month" | "week" | "day">("month");

  const handleAddEvent = (dateKey: string, time: string, event: string) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: {
        ...(prevEvents[dateKey] || {}),
        [time]: [...(prevEvents[dateKey]?.[time] || []), event],
      },
    }));
  };

  const handleEditEvent = (
    dateKey: string,
    time: string,
    index: number,
    event: string
  ) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: {
        ...prevEvents[dateKey],
        [time]: prevEvents[dateKey][time].map((e, i) =>
          i === index ? event : e
        ),
      },
    }));
  };

  const handleDeleteEvent = (dateKey: string, time: string, index: number) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: {
        ...prevEvents[dateKey],
        [time]: prevEvents[dateKey][time].filter((_, i) => i !== index),
      },
    }));
  };

  const handlePrevious = () => {
    if (view === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    } else if (view === "week") {
      setCurrentDate(addDays(currentDate, -7));
    } else if (view === "day") {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const handleNext = () => {
    if (view === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    } else if (view === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else if (view === "day") {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  return (
    <div className="calendar p-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onChangeView={setView}
        view={view}
      />
      {view === "month" && (
        <MonthView
          currentDate={currentDate}
          events={events}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
      {view === "week" && (
        <WeekView
          currentDate={currentDate}
          events={events}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
      {view === "day" && (
        <DayView
          currentDate={currentDate}
          events={events}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
