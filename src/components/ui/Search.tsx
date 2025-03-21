"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search({ defaultValue }: any) {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        router.push(`?search=${searchTerm}`);
      } else {
        router.push(`/barbers`);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, router]);
  return (
    <input
      type="text"
      placeholder="Search holder"
      className="px-2 py-1 bg-neutral-800"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
