import BarberCard from "@/components/ui/BarberCard";
import Search from "@/components/ui/Search";
import Tab from "@/components/ui/Tab";
import axiosInstance from "@/axios";
import NoData from "@/components/layout/NoData";
import FilterOpenBtn from "@/components/ui/FilterOpenBtn";


async function getBarbers(params: { search: string; services: string }) {
  try {
    const res = await axiosInstance.get("/barbers", {
      params: params,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong! check the console");
  }
}

export default async function page({ searchParams  }: any) {
  const { search, services } = await searchParams ;


  const barbers = await getBarbers({
    search: search,
    services: services,
  });

  return (
    <div>
      <Tab
        actions={
          <div className="flex gap-4">
            <Search defaultValue={search ? search : ""} />
            <FilterOpenBtn />
          </div>
        }
        headers={[
          { text: "all", key: "all" },
          { text: "shops", key: "shops" },
          { text: "self", key: "self" },
        ]}
        contents={[
          {
            content:
              barbers?.results?.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-10">
                  {barbers?.results?.map((item: any) => (
                    <BarberCard key={item.slug} item={item} />
                  ))}
                </div>
              ) : (
                <NoData />
              ),
            key: "all",
          },
          {
            content:
              barbers?.results?.filter((item: any) => !item.is_shop).length >
              0 ? (
                <div className="grid grid-cols-3 gap-10">
                  {barbers?.results
                    ?.filter((item: any) => item.is_shop)
                    .map((item: any) => (
                      <BarberCard key={item.slug} item={item} />
                    ))}
                </div>
              ) : (
                <NoData />
              ),
            key: "shops",
          },
          {
            content:
              barbers?.results?.filter((item: any) => !item.is_shop).length >
              0 ? (
                <div className="grid grid-cols-3 gap-10">
                  {barbers?.results
                    ?.filter((item: any) => !item.is_shop)
                    .map((item: any) => (
                      <BarberCard key={item.slug} item={item} />
                    ))}
                </div>
              ) : (
                <NoData />
              ),
            key: "self",
          },
        ]}
      />
    </div>
  );
}
