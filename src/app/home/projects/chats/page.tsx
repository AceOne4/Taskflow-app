import React from "react";
import ChatPage from "@/components/chatComp/ChatPage";
import { getAllUsers } from "@/utils/sevice-data";
import { auth } from "@/utils/auth";

async function page() {
  const users = await getAllUsers();
  const sesssion = await auth();

  return (
    <div className="h-screen w-screen">
      <ChatPage users={users} session={sesssion} />
    </div>
  );
}

export default page;
