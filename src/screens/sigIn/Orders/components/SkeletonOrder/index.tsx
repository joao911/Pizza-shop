import React from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { map } from "lodash";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonOrder: React.FC = () => {
  return map(Array.from({ length: 10 }), (_, index) => {
    return (
      <TableRow key={index}>
        <TableCell>
          <Button variant={"outline"} size={"xs"} disabled>
            <Search className="h-3 w-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>
        <TableCell className="text-muted-foreground">
          <Skeleton className="h-4 w-[148px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[110px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[64px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>
      </TableRow>
    );
  });
};
