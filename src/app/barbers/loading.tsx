export default function loading() {
  return (
    <div className="grid grid-cols-3 gap-10">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item}>
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
  );
}
