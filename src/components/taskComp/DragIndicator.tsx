import React from "react";

function DragIndicator({
  beforeid,
  column,
}: {
  beforeid: string;
  column: string;
}) {
  return (
    <div
      data-before={beforeid}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-500 opacity-0"
    ></div>
  );
}

export default DragIndicator;
