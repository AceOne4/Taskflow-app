import React from "react";
import { IProject } from "@/types/types";

type Toverview = {
  projects: IProject[];
};

const ProjectOverview: React.FC<Toverview> = ({ projects }) => {
  return (
    <div
      className={`grid grid-cols-1  gap-6 mt-6${
        projects.length > 2
          ? "md:grid-cols-3"
          : `md:grid-cols-${projects.length}`
      }`}
    >
      {projects?.map((project, index) => (
        <div key={index} className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold">{project.name}</h3>
          <p className="text-gray-400">
            Team Members: {project.members.length}
          </p>
          <p className="text-gray-400">Budget: {project.budget}</p>
          <p
            className={`text-${
              project.status === "Completed"
                ? "green"
                : project.status === "In Progress"
                ? "yellow"
                : "red"
            }-400`}
          >
            {project.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectOverview;
