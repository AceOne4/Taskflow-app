// pages/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import ContactList from "./ContactList";
import ChatBox from "./ChatBox";
import { IMessage, IUser } from "@/types/types";
import { Session } from "next-auth";
import { newId } from "@/utils/helper";
import { getMessagesbyChannel } from "@/utils/sevice-data";

export interface Message {
  sender: string;
  text: string;
}

const ChatPage: React.FC<{ users: IUser[]; session: Session | null }> = ({
  users,
  session,
}) => {
  const [selectedContact, setSelectedContact] = useState<IUser | null>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const filteredContact = users.filter(
    (user) => user._id !== session?.user?.id
  );

  const handleSelectContact = async (contact: IUser) => {
    setSelectedContact(contact);
    // Reset messages for the new contact (for demo purposes)
    const messages = await getMessagesbyChannel(
      String(newId(contact?._id, session?.user?.id as string))
    );

    setMessages(messages);
  };

  return (
    <div className="flex h-full w-full px-3 py-3 ">
      <ContactList
        contacts={filteredContact}
        selectedContact={selectedContact}
        onSelectContact={handleSelectContact}
      />
      <div className="flex-1">
        {selectedContact ? (
          <ChatBox
            selectedContact={selectedContact}
            messages={messages}
            session={session}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
