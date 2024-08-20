// src/pages/profile.tsx
import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import Settings from "./Settings";
import ActivityLog from "./ActivityLog";
import ProjectAssignments from "./ProjectAssignments";
import { auth } from "@/utils/auth";

const sampleProjects = [
  { name: "Project Alpha", role: "Lead Developer" },
  { name: "Project Beta", role: "Contributor" },
];

const ProfilePage: React.FC = async () => {
  const sesssion = await auth();
  return (
    <div className="container mx-auto p-6">
      <ProfileHeader
        profilePicture={sesssion?.user?.image || ""}
        name={sesssion?.user?.name || ""}
        jobTitle="Software Developer"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <ProfileForm session={sesssion} jobTitle="Software Developer" />
        </div>
        <div className="col-span-1">
          <Settings />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <ActivityLog />
        </div>
        <div className="col-span-1">
          <ProjectAssignments projects={sampleProjects} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
