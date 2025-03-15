"use client";

import { useState } from "react";

type TabProps = {
  headers: { text: string; key: string }[];
  contents: { content: any; key: string }[];
};

export default function Tab({ headers, contents }: TabProps) {
  const [currKey, setCurrKey] = useState(headers[0].key);
  return (
    <div>
      <div className="border-b border-white/20 mb-2 pb-2 flex gap-4 text-xl uppercase">
        {headers.map((item) => (
          <div onClick={() => setCurrKey(item.key)} className={`cursor-pointer ${currKey === item.key ? "text-white font-bold" : "text-white/40"}`}>{item.text}</div>
        ))}
      </div>
      <div>{contents.find((item) => item.key === currKey)?.content}</div>
    </div>
  );
}
