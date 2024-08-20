"use client";
import React from "react";
import { Bar } from "react-chartjs-2";

import "./chartjs-setup";

type Ttaskprogrss = {
  dataNum: number[];
};

const TaskProgressChart: React.FC<Ttaskprogrss> = ({ dataNum }) => {
  const data = {
    labels: ["To Do", "In Progress", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: dataNum,
        backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"],
      },
    ],
  };
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Task Progress</h2>
      <Bar data={data} />
    </div>
  );
};

export default TaskProgressChart;
