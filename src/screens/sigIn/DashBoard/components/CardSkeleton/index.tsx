import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

// import { Container } from './styles';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="space-y-1 pl-6">
      <Skeleton className="mt-1 h-7 w-36" />
      <Skeleton className="h-4 w-52" />
    </div>
  );
};
