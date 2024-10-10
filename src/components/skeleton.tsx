import { Skeleton } from "@/components/ui/skeleton";
export default function skeleton() {
  return (
    <div className="border flex flex-col flex-grow rounded-lg p-4 border-white/15 h-full min-w-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
      <p className="mt-2 text-sm text-gray-400 mb-4">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </p>
      <hr className="py-2 border-white/15" />
      <div className="flex justify-between items-center">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
    </div>
  );
}
