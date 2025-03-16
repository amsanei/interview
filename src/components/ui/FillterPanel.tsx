"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/axios";

export default function FillterPanel({ defaultValue }: any) {
  const [services, setServices] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] =
    useState<string[]>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const submitFillters = () => {
    if (selectedServices.length > 0) {
      params.set("services", selectedServices.join(","));
    } else {
      params.delete("services");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCheckboxChange = (service: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((s) => s !== service)
        : [...prevSelected, service]
    );
  };

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

  return isLoading ? (
    "wait.."
  ) : services ? (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="size-8 rounded-full bg-neutral-800 grid place-content-center"
      >
        F
      </div>
      <div
        className={`fixed ${
          isOpen ? "left-0" : "-left-full"
        } transition-all duration-500 h-screen bg-neutral-900/70 backdrop-blur-3xl top-0 md:w-1/4 w-full  p-4 flex flex-col`}
      >
        <div className="text-3xl font-bold mb-8">
          Select The Service <br /> You Want
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className="absolute cursor-pointer top-4 right-4 border border-neutral-400 rounded-full size-6 bg-neutral-800 grid place-content-center"
        >
          ×
        </div>
        <div className="flex flex-col gap-2 overflow-auto h-[70vh]">
          {services?.map((item: any) => (
            <div
              className="flex items-center w-full hover:bg-amber-800 p-2"
              key={item.slug}
            >
              <input
                type="checkbox"
                defaultChecked={selectedServices.includes(item.slug)}
                onChange={() => handleCheckboxChange(item.slug)}
                id={item.slug}
              />
              <label
                htmlFor={item.slug}
                className="flex justify-between items-center cursor-pointer w-full"
              >
                <div>{item.title}</div>
                {item.icon ? (
                  <Image
                    src={item?.icon}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="size-6 rounded-full border"
                  />
                ) : (
                  <div className="bg-neutral-800 rounded-full size-6 border"></div>
                )}
              </label>
            </div>
          ))}
        </div>
        <button
          className="bg-amber-600 px-2 py-1 uppercase mt-auto w-full text-black font-bold cursor-pointer"
          onClick={submitFillters}
        >
          submit
        </button>
      </div>
    </>
  ) : (
    "nodata"
  );
}
