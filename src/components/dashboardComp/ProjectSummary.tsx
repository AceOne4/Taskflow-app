import React from "react";

type Tsummary = {
  summary: { name: string; id: string; progress: number }[];
};

const ProjectSummary: React.FC<Tsummary> = ({ summary }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full ">
      <h2 className="text-xl font-bold text-white mb-4">Ongoing Projects</h2>
      <ul>
        {summary.map((project, index) => (
          <li key={index} className="mb-2">
            <div className="flex justify-between text-white">
              <span>{project.name}</span>
              <span>{project.progress.toFixed(1)}%</span>
            </div>
            <div className="bg-gray-600 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSummary;
