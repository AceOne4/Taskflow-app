import React from "react";

const teamMembers = [
  { name: "John Doe", status: "Online" },
  { name: "Jane Smith", status: "Offline" },
  { name: "Alice Johnson", status: "Online" },
];

const TeamCollaboration: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Team Collaboration</h2>
      <ul>
        {teamMembers.map((member, index) => (
          <li key={index} className="flex justify-between text-gray-400 mb-2">
            <span>{member.name}</span>
            <span
              className={
                member.status === "Online" ? "text-green-500" : "text-red-500"
              }
            >
              {member.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamCollaboration;
