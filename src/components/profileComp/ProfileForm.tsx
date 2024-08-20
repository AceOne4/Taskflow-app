// src/components/Profile/ProfileForm.tsx
"use client";
import { Session } from "next-auth";
import React, { useState } from "react";

type TForm = {
  session: Session | null;
  jobTitle: string;
};

const ProfileForm: React.FC<TForm> = ({ session, jobTitle }) => {
  const [newname, setName] = useState(session?.user?.name);
  const [newemail, setEmail] = useState(session?.user?.email);
  const [newjobTitle, setJobTitle] = useState(jobTitle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="profile-form border border-neutral-500 p-6 rounded-lg   w-full h-full">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300">Name</label>
          <input
            type="text"
            value={newname || ""}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-neutral-600 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            value={newemail || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-neutral-600 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Job Title</label>
          <input
            type="text"
            value={newjobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-2 rounded bg-neutral-600 text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
