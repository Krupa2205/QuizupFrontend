import React from "react";

export function Progress({ value, className }) {
  return (
    <div className={`w-full bg-gray-700 rounded-full h-2 ${className}`}>
      <div
        className="bg-green-500 h-2 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
