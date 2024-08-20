import ProjectsPage from "@/components/ProjectsComp/Projects";
import React from "react";
export const metadata = {
  title: "Task Flow | Projects",
};

function page() {
  return (
    <div className="container mx-auto w-screen h-screen ">
      <ProjectsPage />
    </div>
  );
}

export default page;
