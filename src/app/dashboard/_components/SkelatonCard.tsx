import { Skeleton } from "@/components/ui/skeleton";

export default function SkelatonCard() {
  return (
    <div className="border rounded-lg px-6 py-6 border-white/15 h-full w-full group bg-[#212121]">
      <div className="flex gap-10 justify-between">
        <div className="w-full">
          <Skeleton className="h-[10px] w-[250px] rounded-xl bg-[#424242]" />
          <Skeleton className="h-[10px] w-full rounded-xl mt-3 bg-[#424242]" />
          <Skeleton className="h-[10px] w-full rounded-xl mt-1 bg-[#424242]" />
        </div>
        <div className="flex items-end">
          <Skeleton className="h-[15px] w-[25px] mt-1 bg-[#424242]" />
        </div>
      </div>
    </div>
  );
}
