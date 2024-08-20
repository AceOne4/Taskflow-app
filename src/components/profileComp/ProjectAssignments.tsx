// src/components/Profile/ProjectAssignments.tsx
import React from "react";

interface Project {
  name: string;
  role: string;
}

const ProjectAssignments: React.FC<{ projects: Project[] }> = ({
  projects,
}) => {
  return (
    <div className=" w-full h-full project-assignments border border-neutral-500 p-6 rounded-lg flex-1">
      <h2 className="text-xl font-bold mb-4">Project Assignments</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index} className="mb-2">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-gray-300">{project.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectAssignments;
