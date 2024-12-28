import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { map } from "lodash";

export const OrderDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Cliente</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[164px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Telefone</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[140px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Email</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[200px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Realizado há
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[148px]" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="text-right">Produto</TableCell>
            <TableCell className="text-right">Qtd.</TableCell>
            <TableCell className="text-right">Preço </TableCell>
            <TableCell className="text-right">Subtotal</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {map(Array.from({ length: 3 }), (_, index) => (
            <TableRow key={index}>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-[140px]" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-3" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-12" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-12" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right">
              Total do pedido
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
