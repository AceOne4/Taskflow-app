// src/pages/projects/index.tsx
"use client";

import React, { useState, useEffect } from "react";
import ProjectTable from "./ProjectTable";

import { IProject, IUser } from "@/types/types";
import Modal from "./Modal";
import NewProjectForm from "./NewProjectForm";
import { getAllProjects, getUserById } from "@/utils/sevice-data";
import { useRouter } from "next/navigation";

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [managers, setManagers] = useState<IUser[]>([]);
  const [members, setMembers] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getAllProjects();
      setProjects(projectsData);

      const projectManagersPromises = projectsData.map((project: IProject) =>
        getUserById(project.manager).then((user) => user)
      );
      const teamPromises = projectsData.flatMap((project: IProject) =>
        project.members.map((memberId) => getUserById(memberId))
      );
      const managersData = await Promise.all(projectManagersPromises);
      const membersData = await Promise.all(teamPromises);

      setManagers(managersData);
      setMembers(membersData);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="flex-1 text-center text-4xl text-white font-bold">
            Projects
          </h1>
          <button
            className="bg-neutral-100 text-indigo-800 px-4 py-2 rounded hover:bg-neutral-300 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            New Project
          </button>
        </div>
        <ProjectTable
          projects={projects}
          manager={managers}
          TeamMembers={members}
        />
        <div className=" fixed bottom-5 right-5 py-3 px-3 bg-indigo-500 rounded-full  hover:scale-105  cursor-pointer ">
          <button
            onClick={() => {
              router.push("/home/projects/chats");
            }}
            className=" rounded-full py-2 px-2 bg-indigo-100 text-indigo-950 "
          >
            Chat
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewProjectForm
          onClose={() => setIsModalOpen(false)}
          members={members}
        />
      </Modal>
    </div>
  );
};

export default ProjectsPage;
