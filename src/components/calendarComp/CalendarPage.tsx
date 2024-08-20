// pages/calendar.tsx
import React from "react";
import ReactCalendar from "./Calendar";

const CalendarPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 w-full h-full">
      <h1 className="text-3xl font-bold text-white mb-6">Calendar</h1>
      <ReactCalendar />
    </div>
  );
};

export default CalendarPage;
