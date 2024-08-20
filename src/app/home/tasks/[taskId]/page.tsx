import TaskDetailsPage from "@/components/taskIdComp/Taskpage";
import { getTaskById, getUserById } from "@/utils/sevice-data";
import React from "react";

type Tprops = {
  params: { taskId: string };
};
async function page({ params }: Tprops) {
  return (
    <div className="w-screen ">
      <TaskDetailsPage params={params} />
    </div>
  );
}

export default page;
