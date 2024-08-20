import ReportsPage from "@/components/reportsComp/ReportPage";
import React from "react";
export const metadata = {
  title: "Task Flow | Reports",
};
function page() {
  return (
    <div className=" container mx-10 min-h-screen w-screen">
      <ReportsPage />
    </div>
  );
}

export default page;
