import React from "react";

export function PaperActions({ left, right, ...props }) {
  return (
    <div className="paper-actions-container" {...props}>
      <div>
        {left}
      </div>
      <div>
        {right}
      </div>
    </div>
  );
}