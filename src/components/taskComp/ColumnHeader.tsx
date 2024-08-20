import React from "react";

type TColumnHeader = {
  title: string;
  headingcolor: string;
  count: number;
};

function ColumnHeader({ title, headingcolor, count }: TColumnHeader) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h1 className={`font-medium ${headingcolor}`}>{title}</h1>
      <span className="rounded text-sm text-neutral-400">{count}</span>
    </div>
  );
}

export default ColumnHeader;
