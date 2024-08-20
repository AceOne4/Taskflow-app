// components/ProjectChart.tsx
"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register chart components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface ProjectChartProps {
  progress: (number | undefined)[];
  names: (string | undefined)[];
}

const ProjectChart: React.FC<ProjectChartProps> = ({ progress, names }) => {
  if (progress.length === 0 || names.length === 0)
    return (
      <div className="flex justify-center items-center font-semibold">
        {" "}
        <p>No Tasks has bee assigned yet</p>
      </div>
    );

  const chartData = {
    labels: names,
    datasets: [
      {
        label: "Progress",
        data: progress,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default ProjectChart;
