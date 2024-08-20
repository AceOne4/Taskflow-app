import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { TagIcon } from "@heroicons/react/24/outline";
import { ITask, TData } from "@/types/types";
import Link from "next/link";
import { getStatusLabel } from "@/utils/helper";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  cards: ITask[];
  taskId: string;
  projectData: TData[];
};

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  cards,
  taskId,
  projectData,
}) => {
  const task = cards.find((c) => c._id === taskId);
  const projectName = projectData.find((p) => p.id === task?.projectId);
  if (!task) return;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:max-w-lg w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  <TagIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-indigo-900 border-b-2 pb-2 border-indigo-200 my-2"
                  >
                    Task Details
                  </DialogTitle>
                  <div className="mt-2 space-y-2">
                    <div className="text-sm text-gray-500">
                      <strong>Project Name:</strong> {projectName?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Task Name:</strong> {task.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Priority:</strong> {task.priority}
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Start Date:</strong>
                      {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Due Date:</strong>{" "}
                      {new Date(task.dueDate as string).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Status:</strong> {getStatusLabel(task.status)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Close
              </button>
              <Link
                href={`/home/tasks/${taskId}`}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
              >
                Details
              </Link>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
