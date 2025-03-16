import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-neutral-800 relative w-full h-[70vh] md:h-[75vh] bg-[url('/barber-shop.jpg')] bg-top md:bg-cover ">
      <div className="absolute inset-0 w-full h-full grid place-content-center md:place-content-end bg-black/70 text-4xl md:text-8xl font-extrabold uppercase text-end">
        find the best
      </div>
    </div>
  );
}
