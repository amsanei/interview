import BarberCard from "@/components/ui/BarberCard";
import FillterPanel from "@/components/ui/FillterPanel";
import Search from "@/components/ui/Search";
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

async function getServices() {
  try {
    const res = await axios.get("https://lookee.nwhco.ir/aapi/services");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function page({ searchParams }: any) {
  const res = await getData();
  const rawData = res.results;
  const servicesList = await getServices();

  const { search, services } = await searchParams;

  let filteredData = rawData;

  if (search)
    filteredData = rawData.filter((item: any) =>
      item.fullname.toLowerCase().includes(search.toLowerCase())
    );

  if (services) {
    const requiredServices = services.split(",");

    filteredData = filteredData.filter((item: any) =>
      requiredServices.every((service: any) =>
        item.services.some(
          (s: any) => s.toLowerCase() === service.toLowerCase()
        )
      )
    );
  }

  return (
    <div>
      <Tab
        actions={
          <div className="flex gap-4">
            <Search />
            <FillterPanel
              services={servicesList.results}
              defaultValue={services?.split(",")}
            />
          </div>
        }
        headers={[
          { text: "all", key: "all" },
          { text: "shops", key: "shops" },
          { text: "self", key: "self" },
        ]}
        contents={[
          {
            content: (
              <div className="grid grid-cols-3 gap-10">
                {filteredData.map((item: any) => (
                  <BarberCard key={item.slug} item={item} />
                ))}
              </div>
            ),
            key: "all",
          },
          {
            content: (
              <div className="grid grid-cols-3 gap-10">
                {filteredData
                  .filter((item: any) => item.is_shop)
                  .map((item: any) => (
                    <BarberCard key={item.slug} item={item} />
                  ))}
              </div>
            ),
            key: "shops",
          },
          {
            content: (
              <div className="grid grid-cols-3 gap-10">
                {filteredData
                  .filter((item: any) => !item.is_shop)
                  .map((item: any) => (
                    <BarberCard key={item.slug} item={item} />
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
