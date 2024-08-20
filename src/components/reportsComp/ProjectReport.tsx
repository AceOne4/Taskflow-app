"use client";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ProjectChart from "./ReportsChart";
import { IProject, ITask, IUser } from "@/types/types";
import { gettasksbyProjectId } from "@/utils/sevice-data";

interface ProjectReportProps {
  project: IProject;
  manager: IUser;
  id: string;
}

const ProjectReport: React.FC<ProjectReportProps> = ({
  project,
  manager,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, settasks] = useState<ITask[]>();

  useEffect(() => {
    const taks = async () => {
      const tasks = await gettasksbyProjectId(id);
      settasks(tasks);
    };
    taks();
  }, [id]);

  const statusColors: Record<string, string> = {
    "In Progress": "bg-yellow-500",
    Completed: "bg-green-500",
    "Not Started": "bg-gray-500",
    "To Do": "bg-red-500",
  };

  const toggleOpen = () => setIsOpen(!isOpen);
  const progress = tasks?.map((task) => task.progress);
  const tasknames = tasks?.map((task) => task.title);
  return (
    <div className="bg-indigo-900 p-6 rounded-lg shadow-lg mb-4">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full text-white"
      >
        <span className="text-2xl font-bold">{project.name}</span>
        <ChevronDownIcon
          className={`w-6 h-6 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-4">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Manager:</span>
              <span className="text-white">{manager.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white">{project.duration}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Budget:</span>
              <span className="text-white">{project.budget} $</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Start Date:</span>
              <span className="text-white">
                {new Date(project.startDate as Date).toLocaleDateString()}
              </span>
            </div>
            <div
              className={`inline-block px-3 py-1 text-xs font-semibold text-white ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </div>
          </div>
          <p className="text-gray-400 mb-4">{project.description}</p>
          {progress && tasknames ? (
            <ProjectChart progress={progress} names={tasknames} />
          ) : (
            <p>no Data</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectReport;
