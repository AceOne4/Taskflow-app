// components/ContactList.tsx
import { IUser } from "@/types/types";
import React from "react";

interface ContactListProps {
  contacts: IUser[];
  selectedContact: IUser | null;
  onSelectContact: (contact: IUser) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContact,
  onSelectContact,
}) => {
  return (
    <div className="  w-1/4  bg-neutral-900 p-4 shadow-lg shadow-indigo-200   text-indigo-400 rounded">
      <h2 className="text-lg font-semibold mb-4">Contacts</h2>
      <ul>
        {contacts?.map((contact) => (
          <li
            key={contact._id}
            className={`p-2 cursor-pointer rounded  mt-2 hover:bg-indigo-300  ${
              selectedContact?._id === contact._id
                ? "bg-indigo-100 hover:bg-indigo-100"
                : ""
            }`}
            onClick={() => onSelectContact(contact)}
          >
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
