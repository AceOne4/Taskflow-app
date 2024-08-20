import CalendarPage from "@/components/calendarComp/CalendarPage";
import React from "react";

export const metadata = {
  title: "Task Flow | Calendar",
};
function page() {
  return (
    <div className="w-screen ">
      <CalendarPage />
    </div>
  );
}

export default page;
