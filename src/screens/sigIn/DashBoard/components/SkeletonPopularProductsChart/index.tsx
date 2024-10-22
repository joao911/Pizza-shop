import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonPopularProductsChart: React.FC = () => {
  return (
    <div className="pl-24">
      <Skeleton className="h-56 w-56 rounded-full" />
    </div>
  );
};
