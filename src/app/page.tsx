import Link from "next/link";

export default function Home() {
  return (
    <div className="grid md:grid-cols-6 gap-4 v-[90h]">
      <Link href="/barbers" className="col-span-2 md:col-span-4">
        <div className="bg-neutral-800 p-4 h-[30vh]  text-xl">list of barbers</div>
      </Link>
      <div className="bg-neutral-800 col-span-2 h-[30vh]"></div>
      <div className="bg-neutral-800 col-span-2 h-[30vh]"></div>
      <div className="bg-neutral-800 col-span-2 h-[30vh]"></div>
      <div className="bg-neutral-800 col-span-2 h-[30vh]"></div>
    </div>
  );
}
