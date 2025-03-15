import axios from "axios";
import Image from "next/image";

async function getData() {
  try {
    const res = await axios.get("https://lookee.nwhco.ir/aapi/barbers");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function page() {
  const data = await getData();

  return (
    <div className="grid grid-cols-3 gap-10">
      {data.results.map((item: any) => (
        <div className="" key={item.slug}>
          <Image
            src={item.avatar}
            alt={item.fullname}
            width={200}
            height={200}
            className="w-full h-[30vh] object-cover"
          />
          <div className="mt-2">
            <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">{item.fullname}</h2>
            <div className="flex gap-1 text-sm">
                <div>{item.reviews_count}</div>
                <div>*</div>
            </div>
            </div>
            <div className="flex gap-2">
                <div>a:</div>
                <div>{item.address}</div>
            </div>
            <div className="flex gap-2">
                <div>p:</div>
                <div>{item.phone_number}</div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {item.services.map((service: string) => (
                <span className="text-white/60 text-xs uppercase">
                  # {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
