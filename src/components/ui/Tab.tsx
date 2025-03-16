"use client";

import React, { useState } from "react";

type TabProps = {
  headers: { text: string; key: string }[];
  contents: { content: any; key: string }[];
  actions: React.ReactNode;
};

export default function Tab({ headers, contents, actions }: TabProps) {
  const [currKey, setCurrKey] = useState(headers[0].key);
  return (
    <div>
      <div className="flex flex-col-reverse gap-2 md:flex-row justify-between items-center">
        <div className="my-4 flex gap-4 uppercase">
          {headers.map((item) => (
            <div
              key={item.key}
              onClick={() => setCurrKey(item.key)}
              className={`cursor-pointer ${
                currKey === item.key ? "text-white font-bold" : "text-white/40"
              }`}
            >
              {item.text}
            </div>
          ))}
        </div>
        {actions}
      </div>
      <div>{contents.find((item) => item.key === currKey)?.content}</div>
    </div>
  );
}
