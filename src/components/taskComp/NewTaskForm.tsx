import React from "react";
import { motion } from "framer-motion";
import { ITask, IUser, TData } from "@/types/types";
import Select from "react-select";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addTask } from "@/utils/actions";

type TtaskForm = {
  projectData: TData[];
  users: IUser[];
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  column: string;
};

const priorityOptions = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

function NewTaskForm({ projectData, users, setAdd, column }: TtaskForm) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you can call your action to add the task
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    await addTask(formData);

    // Close the form after submission
    setAdd(false);
  };
  return (
    <motion.form onSubmit={handleSubmit}>
      <input
        required
        name="title"
        type="text"
        defaultValue=""
        placeholder="Title"
        className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0 mb-2"
      />
      <textarea
        required
        defaultValue=""
        name="description"
        placeholder="Description"
        className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0 mb-2"
      />
      <Select
        required
        options={users.map((user) => ({
          value: user._id,
          label: user.name,
        }))}
        className="w-full border p-2 rounded text-neutral-900  bg-violet-400/20"
        name="assignedTo"
        placeholder="Assign To"
      />
      <Select
        required
        options={projectData.map((project) => ({
          value: project.id,
          label: project.name,
        }))}
        className="w-full border p-2 rounded text-neutral-900  bg-violet-400/20"
        name="projectId"
        placeholder="Project"
      />
      <input
        required
        name="dueDate"
        type="date"
        defaultValue=""
        className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0 mb-2"
      />
      <Select
        required
        options={priorityOptions}
        className="w-full border p-2 rounded text-neutral-900  bg-violet-400/20"
        name="priority"
        placeholder="Priority"
      />

      <input
        type="text"
        defaultValue={column}
        name="status"
        className="w-full border p-2 rounded text-violet-300 bg-violet-400/20"
        readOnly
      />
      <input
        required
        type="number"
        defaultValue=""
        name="progress"
        placeholder="Progress"
        className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0 mb-2"
      />
      <div className=" mt-1.5 flex items-center justify-end gap-1.5">
        <button
          className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
          onClick={() => setAdd(false)}
        >
          Close
        </button>
        <button
          type="submit"
          className=" flex gap-2 px-3 py-1.5 text-xs rounded text-neutral-950 bg-neutral-50 transition-colors hover:bg-neutral-300"
        >
          <span>Add</span>
          <PlusIcon />
        </button>
      </div>
    </motion.form>
  );
}

export default NewTaskForm;
