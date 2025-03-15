import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="flex justify-between items-center">
      <ul className="flex gap-4">
        {LINKS.map((link) => (
          <li key={link.id} className="uppercase text-sm text-white/40 hover:text-white">
            <Link href={link.href}>/ {link.text}</Link>
          </li>
        ))}
      </ul>
      <div className="uppercase text-sm text-white/40 underline underline-offset-4">Made with love by 11</div>
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
