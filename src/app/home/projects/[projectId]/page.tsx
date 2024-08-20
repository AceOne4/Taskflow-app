import ProjectPage from "@/components/projectIdComp/ProjectPage";
import { ITask } from "@/types/types";
import { convertISOToCustomDate } from "@/utils/helper";
import {
  getProjectById,
  gettasksbyProjectId,
  getUserById,
} from "@/utils/sevice-data";
import React from "react";

type Tprops = {
  params: { projectId: string };
};

export type Trows = [
  string,
  string,
  string,
  Date,
  Date,
  number | null,
  number,
  string | null
];
async function page({ params }: Tprops) {
  const { projectId } = params;
  const theProject = await getProjectById(projectId);
  const manager = await getUserById(theProject.manager);
  const tasks = await gettasksbyProjectId(projectId);
  const teamMembersPromisses = theProject.members.map((memeber: string) =>
    getUserById(memeber).then((user) => user)
  );
  const teamMembers = await Promise.all(teamMembersPromisses);

  const rows: Trows[] = tasks?.map((task: ITask) => [
    task._id,
    task.title,
    theProject.name,
    convertISOToCustomDate(task.createdAt as string),
    convertISOToCustomDate(task.dueDate as string),
    null,
    task.progress,
    null,
  ]);

  return (
    <div className="w-screen h-screen relative">
      <ProjectPage
        project={theProject}
        manager={manager}
        members={teamMembers}
        tasks={tasks}
        rows={rows}
      />
    </div>
  );
}

export default page;
