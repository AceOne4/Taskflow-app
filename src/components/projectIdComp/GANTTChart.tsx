import { Trows } from "@/app/home/projects/[projectId]/page";
import { ITask } from "@/types/types";
import React from "react";
import { Chart } from "react-google-charts";

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

type Tprops = {
  rows: Trows[];
};
export function GANTTChart({ rows }: Tprops) {
  const data = [columns, ...rows];

  const options = {
    gantt: {
      trackHeight: 30,
    },
  };

  if (rows.length === 0) return <p>No Task has been Assigned </p>;
  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}
