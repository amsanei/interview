import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between">
      <div className="">
        <h1 className="text-5xl font-bold">Carti Cut</h1>
        <div className="mt-1 tracking-widest">FIND YOUR LAST BARBER</div>
      </div>
      <div className="border-l border-white/20 pl-4 py-2 w-1/2 text-white/45 text-sm">
        Using negative values doesn't make a ton of sense with the named letter
        spacing scale Tailwind includes out of the box, but if you've customized
        your scale to use numbers it can be useful.
      </div>
    </div>
  );
}
