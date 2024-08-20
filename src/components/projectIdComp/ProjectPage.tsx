"use client";
import React, { useState } from "react";
import { GANTTChart } from "./GANTTChart";
import { IProject, ITask, IUser } from "@/types/types";
import { Trows } from "@/app/home/projects/[projectId]/page";

type TProjectprops = {
  project: IProject;
  manager: IUser;
  members: IUser[];
  tasks: ITask[];
  rows: Trows[];
};

const ProjectPage: React.FC<TProjectprops> = ({
  project,
  manager,
  members,
  tasks,
  rows,
}) => {
  const [view, setView] = useState("timeline");

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-indigo-600">{project.name}</h1>
        <p className="text-gray-600">
          Project Manager:{" "}
          <span className="text-indigo-500">{manager.name}</span>
        </p>
        <p className="text-gray-600">
          Project Status:{" "}
          <span className="text-green-500">{project.status}</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-indigo-500 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Total Tasks</h2>
          <p className="text-indigo-200">{tasks.length}</p>
        </div>
        <div className="bg-indigo-500 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Budget</h2>
          <p className="text-indigo-200">${project.budget}</p>
        </div>
        <div className="bg-indigo-500 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Members</h2>
          <p className="text-indigo-200">{members.length}</p>
        </div>
        <div className="bg-indigo-500 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Duration</h2>
          <p className="text-indigo-200">{project.duration}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <ul className="flex border-b">
          <li className="mr-1">
            <button
              onClick={() => setView("description")}
              className="bg-indigo-500 inline-block py-2 px-4 text-white hover:text-blue-500"
            >
              Description
            </button>
          </li>
          <li className="mr-1">
            <button
              onClick={() => setView("timeline")}
              className="bg-indigo-500 inline-block py-2 px-4 text-white hover:text-blue-500"
            >
              Timeline
            </button>
          </li>
          <li className="mr-1">
            <button
              onClick={() => setView("team")}
              className="bg-indigo-500 inline-block py-2 px-4 text-white hover:text-blue-500"
            >
              Team
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        {/* Description */}
        {view === "description" && (
          <div id="description">
            <h2 className="text-2xl font-bold">Project Description</h2>
            <p className="text-gray-600 mt-4">{project.description}</p>
          </div>
        )}

        {/* Timeline */}
        {view === "timeline" && (
          <div id="timeline">
            <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
            <GANTTChart rows={rows} />
          </div>
        )}

        {/* Team */}
        {view === "team" && (
          <div id="team">
            <h2 className="text-2xl font-bold">Project Team</h2>
            {members.map((member) => (
              <div key={member._id} className="mt-6">
                <p>
                  <span className="font-semibold text-lg text-indigo-900">
                    {member.role}
                  </span>{" "}
                  :{member.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
