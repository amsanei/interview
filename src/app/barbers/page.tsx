"use client";

import BarberCard from "@/components/ui/BarberCard";
import FillterPanel from "@/components/ui/FillterPanel";
import Search from "@/components/ui/Search";
import Tab from "@/components/ui/Tab";
import axiosInstance from "@/axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function page() {
  const [barbers, setBarbers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const services = searchParams.get("services");

  const getBarbers = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/barbers", {
        params: {
          search: search,
          services : services
        },
      });
      setBarbers(res.data);
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong! check the console");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBarbers();
  }, [search,services]);

  return isLoading ? (
    "wait...."
  ) : barbers ? (
    <div>
      <Tab
        actions={
          <div className="flex gap-4">
            <Search />
            <FillterPanel
              defaultValue={services ? services?.split(",") : []}
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
              <div className="grid md:grid-cols-3 gap-10">
                {barbers?.results?.map((item: any) => (
                  <BarberCard key={item.slug} item={item} />
                ))}
              </div>
            ),
            key: "all",
          },
          {
            content: (
              <div className="grid grid-cols-3 gap-10">
                {barbers?.results
                  ?.filter((item: any) => item.is_shop)
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
                {barbers?.results
                  ?.filter((item: any) => !item.is_shop)
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
  ) : (
    <div>note ound</div>
  );
}
