"use client";
import { lazy, Suspense, useState } from "react";
const FillterPanel = lazy(() => import("@/components/ui/FillterPanel"));

export default function FilterOpenBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="size-8 rounded-full bg-neutral-800 grid place-content-center cursor-pointer"
      >
        <svg
          className="w-[22px] h-[22px] text-gray-800 dark:text-white"
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
            strokeWidth="1.6"
            d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
          />
        </svg>
      </div>
      {isOpen && (
        <Suspense>
          <FillterPanel panelOnCLose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
