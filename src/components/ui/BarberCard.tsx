import Image from "next/image";

export default function BarberCard({ item }: any) {
  return (
    <div className="" key={item.slug}>
      <Image
        src={item.avatar}
        alt={item.fullname}
        width={200}
        height={200}
        className="w-full md:h-[40vh] h-[50vh] object-cover"
        unoptimized
      />
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-bold text-lg">{item.fullname}</h2>
          <div className="flex gap-2">
            <div className="flex gap-1 text-sm">
              <div>C</div>
              <div>{item.reviews_count}</div>
            </div>
            <div className="flex gap-1 text-sm">
              <div>R</div>
              <div>{item.rate}</div>
            </div>
          </div>
        </div>
        <div className="text-sm text-neutral-400">{item.address}</div>
        <div className="flex flex-wrap gap-2 mt-4">
          {item.services.map((service: string, index:number) => (
            <span className="text-neutral-600 text-xs uppercase" key={index}>
              # {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
