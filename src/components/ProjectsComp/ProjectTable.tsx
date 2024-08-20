import React from "react";
import ProjectRow from "./ProjectRow";
import { IProject, IUser } from "@/types/types";

interface ProjectTableProps {
  projects: IProject[];
  manager: IUser[];
  TeamMembers: IUser[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  manager,
  TeamMembers,
}) => {
  return (
    <div className="container mx-auto py-8">
      <table className="min-w-full 900 text-white">
        <thead>
          <tr className="bg-indigo-800">
            <th className="px-4 py-2 border-b border-gray-300">Project Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Duration</th>
            <th className="px-4 py-2 border-b border-gray-300">PM Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Budget</th>
            <th className="px-4 py-2 border-b border-gray-300">
              Starting Date
            </th>
            <th className="px-4 py-2 border-b border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <ProjectRow
              id={project._id as string}
              key={project._id}
              name={project.name}
              duration={project.duration}
              manager={manager[index]?.name}
              budget={project.budget}
              startDate={project.startDate}
              status={project.status}
              description={project.description} // Not displayed
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
