import React from "react";
import { Skeleton } from "../../../../components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...new Array(6)].fill(0).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </div>
  );
}
