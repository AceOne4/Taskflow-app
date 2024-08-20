import Sidebar from "@/components/navigations/SideBar";
import React, { ReactNode } from "react";

type Tprops = {
  children: ReactNode;
};

function layout({ children }: Tprops) {
  return (
    <div className="flex ">
      <Sidebar />
      {children}
    </div>
  );
}

export default layout;
