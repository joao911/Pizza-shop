import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";

export const OrderTableFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const orderFilterSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional(),
  });

  type OrderFilter = z.infer<typeof orderFilterSchema>;

  const { handleSubmit, register, control, reset, watch } =
    useForm<OrderFilter>({
      resolver: zodResolver(orderFilterSchema),
      defaultValues: {
        orderId: orderId ?? "",
        customerName: customerName ?? "",
        status: status ?? "all",
      },
    });

  const watchedStatus = watch("status");
  const wanchedOrderId = watch("orderId");
  const wanchedCustomerName = watch("customerName");

  const handleReset = () => {
    reset();
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("customerName");
      state.delete("status");
      state.set("page", "1");
      return state;
    });
  };

  const onSubmit = (data: OrderFilter) => {
    const { orderId, customerName, status } = data;
    setSearchParams((state) => {
      if (orderId) {
        state.set("orderId", orderId);
      } else {
        state.delete("orderId");
      }
      if (customerName) {
        state.set("customerName", customerName);
      } else {
        state.delete("customerName");
      }
      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }
      state.set("page", "1");
      return state;
    });
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register("orderId")}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register("customerName")}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { value, onChange, name, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              onValueChange={onChange}
              name={name}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />

      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar
      </Button>
      {wanchedOrderId || wanchedCustomerName || watchedStatus !== "all" ? (
        <Button variant="outline" size="xs" type="button" onClick={handleReset}>
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      ) : null}
    </form>
  );
};
