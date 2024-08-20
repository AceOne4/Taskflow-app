import DashboardPage from "@/components/dashboardComp/DashboardPage";
import { createData } from "@/utils/addData";
import { getAllProjects, getAllTasks, getAllUsers } from "@/utils/sevice-data";
import React from "react";

export const metadata = {
  title: "Task Flow | Dashboard",
};

async function page() {
  const projects = await getAllProjects();
  const tasks = await getAllTasks();
  const users = await getAllUsers();

  return (
    <div className="flex items-center justify-center w-screen">
      <DashboardPage projects={projects} tasks={tasks} team={users} />
    </div>
  );
}

export default page;
