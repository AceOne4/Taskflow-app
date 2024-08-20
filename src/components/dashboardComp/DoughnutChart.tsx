"use client";
// src/components/Charts/DoughnutChart.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart: React.FC = () => {
  const data = {
    labels: ["Completed Tasks", "Pending Tasks", "Overdue Tasks"],
    datasets: [
      {
        label: "Tasks",
        data: [50, 30, 20], // example data
        backgroundColor: ["#4CAF50", "#FFEB3B", "#F44336"],
        borderColor: ["#4CAF50", "#FFEB3B", "#F44336"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "left" as "left",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
