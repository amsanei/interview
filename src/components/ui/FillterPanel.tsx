"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/axios";

export default function FillterPanel({
  panelOnCLose,
}: {
  panelOnCLose: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const [services, setServices] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    searchParams.get("services")?.split(",") || []
  );

  
  const handleCheckboxChange = (service: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((s) => s !== service)
        : [...prevSelected, service]
    );
  };

  useEffect(() => {
    const submitFillters = () => {
      if (selectedServices.length > 0) {
        params.set("services", selectedServices.join(","));
      } else {
        params.delete("services");
      }
      router.push(`${pathname}?${params.toString()}`);
    };  
    submitFillters();
  }, [selectedServices]);

  useEffect(() => {
    const controller = new AbortController();
    const getServices = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/services");
        setServices(res.data.results);
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong! check the console");
      } finally {
        setIsLoading(false);
      }
    };
    getServices();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div
      className={`fixed left-0 transition-all duration-500 h-screen bg-neutral-900/70 backdrop-blur-3xl top-0 md:w-1/4 w-full  p-4 flex flex-col`}
    >
      <div className="text-3xl font-bold mb-8">
        Select The Service <br /> You Want
      </div>
      <div
        onClick={panelOnCLose}
        className="absolute cursor-pointer top-6 right-6 border border-neutral-400 rounded-full size-6 bg-neutral-800 grid place-content-center"
      >
        ×
      </div>
      <div className="flex flex-col gap-2 overflow-auto h-[90vh]">
        {isLoading
          ? Array.from({ length: 20 }).map((_, index) => (
              <div
                className="h-8 w-full bg-neutral-700 animate-pulse"
                key={index}
              ></div>
            ))
          : services?.map((item: any) => (
              <div
                className="flex items-center w-full transition-colors hover:bg-neutral-600 p-2"
                key={item.slug}
              >
                <label
                  htmlFor={item.slug}
                  className="flex justify-between items-center cursor-pointer w-full group"
                >
                  <input
                    type="checkbox"
                    defaultChecked={selectedServices.includes(item.slug)}
                    onChange={() => handleCheckboxChange(item.slug)}
                    id={item.slug}
                    className="hidden peer"
                  />
                  <div>{item.title}</div>
                  <div className=" bg-neutral-800 peer-checked:bg-white rounded-full size-6 border border-neutral-400"></div>
                </label>
              </div>
            ))}
      </div>
    </div>
  );
}
