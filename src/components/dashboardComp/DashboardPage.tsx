import React from "react";
import ProjectSummary from "./ProjectSummary";
import RecentActivity from "./RecentActivity";
import TaskProgressChart from "./TaskProgressChart";
import TeamCollaboration from "./TeamCollaboration";
import DataFilters from "./DataFilters";
import UserPerformanceMetrics from "./UserPerformanceMetrics";
import ProjectOverview from "./ProjectOverview";
import { IProject, ITask, IUser } from "@/types/types";
import { filtertaks, generateProjectSummary } from "@/utils/helper";

type Tdashprops = {
  projects: IProject[];
  tasks: ITask[];
  team: IUser[];
};

const DashboardPage: React.FC<Tdashprops> = ({ projects, tasks, team }) => {
  const summary = generateProjectSummary(projects, tasks);
  const todo = filtertaks(tasks, "todo").length;
  const doing = filtertaks(tasks, "doing").length;
  const done = filtertaks(tasks, "done").length;
  const data = [todo, doing, done];

  return (
    <div className="container mx-auto p-6">
      <DataFilters />

      <div className="grid grid-cols-3 lg:grid-cols-2 gap-6">
        <ProjectOverview projects={projects} />
        <ProjectSummary summary={summary} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UserPerformanceMetrics />
        <TaskProgressChart dataNum={data} />
      </div>
      <div className="flex flex-col gap-6 mt-6">
        <RecentActivity />

        <TeamCollaboration />
      </div>
    </div>
  );
};

export default DashboardPage;
