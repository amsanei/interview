import React from "react";

export default function NoData() {
  return (
    <div className="grid place-content-center text-gray-800 dark:text-white/40">
      <div>
        <svg
          className="w-[36px] h-[36px]  mx-auto"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M3 19V6a1 1 0 0 1 1-1h4.032a1 1 0 0 1 .768.36l1.9 2.28a1 1 0 0 0 .768.36H16a1 1 0 0 1 1 1v1M3 19l3-8h15l-3 8H3Z"
          />
        </svg>
      </div>
      <div className="text-center">No Data Found!</div>
    </div>
  );
}
