import React from "react";
import { IUser } from "@/types/types";
import Select from "react-select";
import Input from "../FormComp/Input";
import { addProject } from "@/utils/actions";
import Button from "../FormComp/Button";

interface ProjectFormModalProps {
  onClose: () => void;
  members: IUser[];
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  onClose,
  members,
}) => {
  return (
    <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded p-6 w-full max-w-lg   shadow-md shadow-indigo-100">
        <h2 className="text-xl mb-4">New Project</h2>
        <form className="grid grid-cols-2 gap-7 " action={addProject}>
          <div>
            <div className="mb-4">
              <Input
                type="text"
                label="Name"
                id="Name"
                defaultValue=""
                required
                placeholder="The Project Name"
                name="Name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                className="w-full border p-2 rounded text-black"
                name="Description"
              ></textarea>
            </div>
            <div className="mb-4  flex flex-col gap-4">
              <label>Status</label>
              <select name="Status" className="text-black ml-5 h-6">
                <option value="undone">Undone</option>
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="mb-4">
              <Input
                type="number"
                label="Budget"
                id="budget"
                defaultValue=""
                required
                placeholder="Project's Budget"
                name="budget"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <Input
                type="date"
                label="Start Date"
                id="starDate"
                defaultValue=""
                required
                placeholder=""
                name="startDate"
              />
            </div>
            <div className="mb-4">
              <Input
                type="date"
                label="End Date"
                id="endDate"
                defaultValue=""
                required
                placeholder=""
                name="endDate"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Members</label>
              <Select
                isMulti
                options={members.map((member) => ({
                  value: member._id,
                  label: member.name,
                }))}
                className="w-full border p-2 rounded"
                name="Members"
              />
            </div>
            <div className="mb-4">
              <Input
                type="color"
                label="Color"
                id="color"
                defaultValue=""
                required
                placeholder=""
                name="color"
              />
            </div>
          </div>
          <div className="flex justify-end col-span-2">
            <button
              className="mr-2 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <Button name="Create" LoadingName="Creating..." />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProjectFormModal;
