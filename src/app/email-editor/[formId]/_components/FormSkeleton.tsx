import { Skeleton } from "@/components/ui/skeleton";

export default function FormSkeleton() {
  return (
    <div className="border rounded-lg px-6 py-6 border-white/15 h-full w-full group bg-[#212121]">
      <div className="">
        <Skeleton className="h-[20px] w-[250px] rounded bg-[#424242]" />
        <Skeleton className="h-[8px] w-full rounded bg-[#424242] mt-3" />
        <div className="mt-10 flex flex-col gap-3">
          <div>
            <Skeleton className="h-[8px] w-[250px] rounded bg-[#424242]" />
            <Skeleton className="h-[15px] w-full rounded bg-[#424242] mt-6" />
          </div>
          <div>
            <Skeleton className="h-[8px] w-[250px] rounded bg-[#424242]" />
            <Skeleton className="h-[15px] w-full rounded bg-[#424242] mt-6" />
          </div>
          <div>
            <Skeleton className="h-[8px] w-[250px] rounded bg-[#424242]" />
            <Skeleton className="h-[15px] w-full rounded bg-[#424242] mt-6" />
          </div>
          <div>
            <Skeleton className="h-[8px] w-[250px] rounded bg-[#424242]" />
            <Skeleton className="h-[15px] w-full rounded bg-[#424242] mt-6" />
          </div>
          <div>
            <Skeleton className="h-[8px] w-[250px] rounded bg-[#424242]" />
            <Skeleton className="h-[15px] w-full rounded bg-[#424242] mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
