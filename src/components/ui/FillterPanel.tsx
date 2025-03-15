"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FillterPanel({ services, defaultValue }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    defaultValue || []
  );

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

  const handleCheckboxChange = (service : string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((s) => s !== service) 
        : [...prevSelected, service]
    );
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>FillterPanel</div>
      <div onClick={submitFillters}>submit</div>
      <div>
        selecred :{" "}
        <div>
          {selectedServices.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2">
          {services?.map((item: any) => (
            <div className="flex gap-2 items-center w-full" key={item.slug}>
              <input
                type="checkbox"
                defaultChecked={selectedServices.includes(item.slug)}
                onChange={() =>
                  handleCheckboxChange(item.slug)
                }
              />
              <label htmlFor="">
                <div className="flex justify-between items-center  w-full">
                  <div>{item.title}</div>
                  {item.icon ? (
                    <Image
                      src={item?.icon}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="size-8 rounded-full"
                    />
                  ) : (
                    <div className="bg-neutral-800 rounded-full size-8"></div>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
