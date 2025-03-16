"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <ul className="flex gap-4">
      {LINKS.map((link) => (
        <li
          key={link.id}
          className={`uppercase text-sm ${
            pathname === link.href ? "text-white" : "text-white/40"
          } hover:text-white`}
        >
          <Link href={link.href}>/ {link.text}</Link>
        </li>
      ))}
    </ul>
  );
}

const LINKS = [
  { id: 1, text: "home", href: "/" },
  { id: 2, text: "barbers", href: "/barbers" },
];
