// src/components/Dashboard/UserPerformanceMetrics.tsx
import React from "react";
import DoughnutChart from "./DoughnutChart";

const UserPerformanceMetrics: React.FC = () => {
  // Example metrics data
  const metrics = [
    { label: "Tasks Completed", value: 120 },
    { label: "Active Projects", value: 5 },
    { label: "Hours Logged", value: 350 },
  ];

  return (
    <>
      <div className="w-full h-96 bg-gray-800  p-6 rounded-lg shadow-lg ">
        <h2 className="text-xl font-bold text-white mb-4">User Performance</h2>

        <DoughnutChart />
      </div>
    </>
  );
};

export default UserPerformanceMetrics;
