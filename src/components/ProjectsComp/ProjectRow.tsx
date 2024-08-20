"use client";
import { removeProject } from "@/utils/actions";
import { TrashIcon } from "@heroicons/react/16/solid";
import { BookOpenIcon, FolderOpenIcon } from "@heroicons/react/24/solid";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ProjectRowProps {
  id: string;
  name: string;
  duration: string;
  manager: string;
  budget: number;
  startDate: string | Date;
  status: string;
  description: string | undefined;
}
const getStatusColor = (status: string) => {
  switch (status) {
    case "Not Started":
      return "bg-gray-500 text-white";
    case "In Progress":
      return "bg-yellow-500 text-white";
    case "Completed":
      return "bg-green-500 text-white";
    case "To Do":
      return "bg-red-500 text-white";
    default:
      return "bg-indigo-500";
  }
};

const ProjectRow: React.FC<ProjectRowProps> = ({
  name,
  duration,
  manager,
  budget,
  startDate,
  status,
  description,
  id,
}) => {
  const router = useRouter();

  const statusColor = getStatusColor(status);

  const startdate = new Date(startDate);
  const theDate = formatDate(startdate, "yyyy-MM-dd");
  const goToProjectHandler = () => {
    router.push(`/home/projects/${id}`);
  };
  const deleteProjectHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    await removeProject(id);
  };

  return (
    <tr className=" hover:bg-indigo-400 transition-colors text-center cursor-pointer">
      <td className="px-4 py-2 border-b border-indigo-700">{name}</td>
      <td className="px-4 py-2 border-b border-indigo-700">{duration}</td>
      <td className="px-4 py-2 border-b border-indigo-700">{manager}</td>
      <td className="px-4 py-2 border-b border-indigo-700">${budget}</td>
      <td className="px-4 py-2 border-b border-indigo-700">{theDate}</td>
      <td className={`px-4 py-2 border-b border-indigo-700 ${statusColor}`}>
        {status}
      </td>
      <td className="px-4 py-2 border border-indigo-700 text-center  ">
        <button
          className="text-neutral-500 hover:text-neutral-200 mr-2"
          onClick={deleteProjectHandler}
          id={id}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
        <button
          className="text-neutral-500 hover:text-neutral-200 mr-2"
          onClick={goToProjectHandler}
        >
          <BookOpenIcon className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default ProjectRow;
