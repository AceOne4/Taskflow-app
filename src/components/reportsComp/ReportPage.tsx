// pages/reports.tsx
import React from "react";
import ProjectReport from "./ProjectReport";
import { IProject } from "@/types/types";
import {
  getAllProjects,
  gettasksbyProjectId,
  getUserById,
} from "@/utils/sevice-data";

// const projects = [
//   {
//     id: 1,
//     name: "Project Alpha",
//     duration: "6 months",
//     manager: "John Doe",
//     budget: "$100,000",
//     startDate: "2024-01-01",
//     status: "In Progress",
//     description: "A detailed description of Project Alpha that is hidden.",
//     progressData: { "Task 1": 20, "Task 2": 40, "Task 3": 60 },
//   },
//   {
//     id: 2,
//     name: "Project Beta",
//     duration: "3 months",
//     manager: "Jane Smith",
//     budget: "$50,000",
//     startDate: "2024-02-15",
//     status: "Completed",
//     description: "A detailed description of Project Beta that is hidden.",
//     progressData: { "Task 1": 80, "Task 2": 90, "Task 3": 100 },
//   },
//   {
//     id: 3,
//     name: "Project Gamma",
//     duration: "1 year",
//     manager: "Alice Johnson",
//     budget: "$200,000",
//     startDate: "2023-10-07",
//     status: "Not Started",
//     description: "This is a sample project description for Project Gamma.",
//     progressData: { "Task 1": 10, "Task 2": 30, "Task 3": 50 },
//   },
// ];

const ReportsPage: React.FC = async () => {
  const Projects = await getAllProjects();
  const projectManagersPromises = Projects.map((project: IProject) =>
    getUserById(project.manager).then((user) => user)
  );

  const manager = await Promise.all(projectManagersPromises);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-6">Reports</h1>
      {Projects.map((project: IProject, index: number) => (
        <ProjectReport
          key={project._id}
          id={project._id || ""}
          project={project}
          manager={manager[index]}
        />
      ))}
    </div>
  );
};

export default ReportsPage;
