"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Search() {
  const searchRef = useRef<any>(null);

  const router = useRouter();

  const handleClick = () => {
    router.push("?search=" + searchRef.current.value);
  };
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search holder"
        className="px-2 py-1 bg-neutral-800"
        ref={searchRef}
      />
      <button onClick={handleClick} className="bg-yellow-400 px-2 py-1 text-black cursor-pointer">s</button>
    </div>
  );
}
