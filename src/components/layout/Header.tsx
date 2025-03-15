import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-baseline">
        <h1 className="text-xl font-bold">Carti Cut</h1>
        <div className="mt-1 tracking-widest text-sm">/ FIND YOUR LAST BARBER</div>
      </div>
      <ul className="flex gap-4">
        {LINKS.map((link) => (
          <li key={link.id} className="uppercase text-sm text-white/40 hover:text-white">
            <Link href={link.href}>/ {link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


const LINKS = [
    { id: 1, text: "home", href: "/" },
    { id: 2, text: "barbers", href: "/barbers" },
    { id: 3, text: "join", href: "/join" },
    { id: 4, text: "login", href: "/login" },
    { id: 5, text: "about us", href: "/about us" },
  ];
  