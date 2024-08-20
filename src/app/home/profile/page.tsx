import ProfilePage from "@/components/profileComp/ProfilePage";
import React from "react";

export const metadata = {
  title: "Task Flow | Profile",
};
function page() {
  return (
    <div className="w-screen">
      <ProfilePage />
    </div>
  );
}

export default page;
