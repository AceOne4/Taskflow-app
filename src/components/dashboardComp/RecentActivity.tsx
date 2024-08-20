import React from "react";

const activities = [
  'John Doe completed task "UI Design"',
  'Jane Smith added a new project "Project Delta"',
  'Alice Johnson commented on task "Backend API Development"',
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="text-gray-400 mb-2">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
