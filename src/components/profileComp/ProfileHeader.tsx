// src/components/Profile/ProfileHeader.tsx
import Image from "next/image";
import React from "react";

interface ProfileHeaderProps {
  profilePicture: string;
  name: string;
  jobTitle: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profilePicture,
  name,
  jobTitle,
}) => {
  return (
    <div className="profile-header flex items-center p-6 bg-neutral-800 text-white rounded-lg">
      <Image
        src={profilePicture}
        alt="Profile Picture"
        width={90}
        height={90}
        className="rounded-full mr-6"
      />
      <div>
        <h1 className="text-2xl font-bold text-center">{name}</h1>
        <p className="text-lg text-center">{jobTitle}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
