"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        router.push(`?search=${searchTerm}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, router]);
  return (
    <input
      type="text"
      placeholder="Search holder"
      className="px-2 py-1 bg-neutral-800"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
