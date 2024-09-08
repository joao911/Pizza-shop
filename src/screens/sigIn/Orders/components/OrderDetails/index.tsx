import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { map } from "lodash";

import { getOrderDetails } from "@/api/get-orer-details";
import { formatCurrency, formatDistanceToNowLocale } from "@/ultils/masks";

interface IOrderDetailsProps {
  orderId: string;
  open: boolean;
}

export const OrderDetails: React.FC<IOrderDetailsProps> = ({
  orderId,
  open,
}) => {
  const { data: order } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                {order?.customer.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                {order?.customer?.phone ?? "Não informado"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell className="flex justify-end">
                {order?.customer?.email ?? "Não informado"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="flex justify-end">
                {order && formatDistanceToNowLocale(new Date(order?.createdAt))}
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
            {map(order?.orderItems, (item) => (
              <TableRow key={item.id}>
                <TableCell className="text-right">
                  {item.product.name}
                </TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency.format(item.priceInCents / 100)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency.format(
                    (item.priceInCents / 100) * item.quantity,
                  )}
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
                {order && formatCurrency.format(order?.totalInCents / 100)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
};
