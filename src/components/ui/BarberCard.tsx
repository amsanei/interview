import Image from "next/image";

export default function BarberCard({ item }: any) {
  return (
    <div className="" key={item.slug}>
      <Image
        src={item.avatar}
        alt={item.fullname}
        width={200}
        height={200}
        className="w-full md:h-[40vh] h-[50vh] object-cover"
        unoptimized
      />
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-bold text-lg">{item.fullname}</h2>
          <div className="flex gap-2">
            <div className="flex gap-1 text-sm">
              <div>
                <svg
                  className="size-4 text-neutral-400"
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
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
              </div>
              <div>{item.reviews_count}</div>
            </div>
            <div className="flex gap-1 text-sm">
              <div>
                <svg
                  className="size-4 text-neutral-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                  />
                </svg>
              </div>
              <div>{item.rate}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-neutral-400">
          <svg
            className="size-4"
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
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
            />
          </svg>
          <div className="text-sm ">{item.address}</div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {item.services.map((service: string, index: number) => (
            <span className="text-neutral-600 text-xs uppercase" key={index}>
              # {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
