import Navigation from "../ui/Navigation";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="flex gap-2 items-baseline">
        <h1 className="text-xl font-bold">Carti Cut</h1>
        <div className="mt-1 tracking-widest text-sm">
          / FIND YOUR LAST BARBER
        </div>
      </div>
     <Navigation />
    </div>
  );
}

