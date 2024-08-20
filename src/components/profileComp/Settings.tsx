// src/components/Profile/Settings.tsx
import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="settings border border-neutral-500 p-6 rounded-lg  w-full h-full flex-1">
      <h2 className="text-xl font-bold mb-4">Account Settings</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Change Password</h3>
        {/* Implement change password form here */}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        {/* Implement notification preferences form here */}
      </div>
    </div>
  );
};

export default Settings;
