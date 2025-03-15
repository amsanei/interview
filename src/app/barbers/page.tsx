import BarberCard from "@/components/ui/BarberCard";
import Tab from "@/components/ui/Tab";
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
    <div>
      <Tab
        headers={[
          { text: "all", key: "all" },
          { text: "shops", key: "shops" },
          { text: "self", key: "self" },
        ]}
        contents={[
          {
            content: (
              <div className="grid grid-cols-3 gap-10">
                {data.results.map((item: any) => (
                  <BarberCard item={item} />
                ))}
              </div>
            ),
            key: "all",
          },
          {
            content: (
              <div className="grid grid-cols-3 gap-10">
                {data.results.filter((item: any) => item.is_shop).map((item: any) => (
                  <BarberCard item={item} />
                ))}
              </div>
            ),
            key: "shops",
          },
          {
            content: (
              <div className="grid grid-cols-3 gap-10">
                {data.results.filter((item: any) => !item.is_shop).map((item: any) => (
                  <BarberCard item={item} />
                ))}
              </div>
            ),
            key: "self",
          },
        ]}
      />
    </div>
  );
}
