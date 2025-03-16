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
        className="size-8 rounded-full bg-neutral-800 grid place-content-center cursor-pointer"
      >
        <svg
          className="w-[22px] h-[22px] text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.6"
            d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
          />
        </svg>
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
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <div
                  className="h-8 w-full bg-neutral-700 animate-pulse"
                  key={index}
                ></div>
              ))
            : services?.map((item: any) => (
                <div
                  className="flex items-center w-full hover:bg-amber-800 p-2"
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
        <button
          className="bg-white px-2 py-1 uppercase mt-auto w-full text-black font-bold cursor-pointer"
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
