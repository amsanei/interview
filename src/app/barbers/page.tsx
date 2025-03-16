"use client";

import BarberCard from "@/components/ui/BarberCard";
import FillterPanel from "@/components/ui/FillterPanel";
import Search from "@/components/ui/Search";
import Tab from "@/components/ui/Tab";
import axiosInstance from "@/axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NoData from "@/components/layout/NoData";

export default function page() {
  const [barbers, setBarbers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const services = searchParams.get("services");

  useEffect(() => {
    const controller = new AbortController();
    const getBarbers = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/barbers", {
          params: {
            search: search,
            services: services,
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
    getBarbers();
    return () => {
      controller.abort();
    };
  }, [search, services]);

  return isLoading ? (
    <div className="grid md:grid-cols-3 gap-10">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index}>
          <div className="h-[30vh] animate-pulse bg-neutral-700 "></div>
          <div className="mt-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className=" animate-pulse bg-neutral-700 w-1/2 h-2"></h2>
            </div>
            <div className="animate-pulse bg-neutral-700 w-2/3 h-2 mb-2"></div>
            <div className="animate-pulse bg-neutral-700 w-2/3 h-2"></div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <Tab
        actions={
          <div className="flex gap-4">
            <Search defaultValue={search ? search : ""} />
            <FillterPanel defaultValue={services ? services?.split(",") : []} />
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
              barbers?.results?.length > 0 && !isLoading ? (
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
              0  && !isLoading  ? (
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
              0 && !isLoading  ? (
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
