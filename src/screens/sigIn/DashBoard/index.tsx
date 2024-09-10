import React from "react";
import { Helmet } from "react-helmet-async";
import { DollarSign, Utensils } from "lucide-react";

import { CardComponent } from "./components/CardComponent";
import { RevenueChart } from "./components/RevenueChart";
import { PopularProductsChart } from "./components/PopularProductsChart";
import { useQuery } from "@tanstack/react-query";
import { getDayOrderAmount } from "@/api/get-day-order-amount";
import { getMonthOrdersAmount } from "@/api/get-month-order-amount";
import { getMonthRevenue } from "@/api/get-month-revenue";
import { formatCurrency } from "@/utils";
import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-order-amount";

export const DashBoard: React.FC = () => {
  const { data: dayOrdersAmount } = useQuery({
    queryFn: getDayOrderAmount,
    queryKey: ["metrics", "month-orders-amount"],
  });

  const { data: getMonthOrderAmountFn } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ["metrics", "day-orders-amount"],
  });

  const { data: getMonthRevenueFN } = useQuery({
    queryFn: getMonthRevenue,
    queryKey: ["metrics", "revenue-amount"],
  });

  const { data: getMonthCanceledOrdersAmountFN } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ["metrics", "canceled-orders-amount"],
  });

  return (
    <div>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <CardComponent
            title="Recita total (mês) "
            value={
              (getMonthRevenueFN &&
                formatCurrency.format(getMonthRevenueFN.receipt / 100)) ||
              0
            }
            percentage={getMonthRevenueFN?.diffFromLastMonth ?? 0}
            subtitle="mês passado"
            icon={<DollarSign className="h-4 w-4 text-foreground" />}
          />
          <CardComponent
            title="Pedidos (mês) "
            value={getMonthOrderAmountFn?.amount ?? 0}
            percentage={getMonthOrderAmountFn?.diffFromLastMonth ?? 0}
            subtitle="mês passado"
            icon={<Utensils className="h-4 w-4 text-foreground" />}
          />
          <CardComponent
            title="Pedidos  (dia) "
            value={dayOrdersAmount?.amount ?? 0}
            percentage={dayOrdersAmount?.diffFromYesterday ?? 0}
            subtitle="a ontem"
            icon={<Utensils className="h-4 w-4 text-foreground" />}
          />
          <CardComponent
            title="Cancelamento (mês) "
            value={getMonthCanceledOrdersAmountFN?.amount ?? 0}
            percentage={getMonthCanceledOrdersAmountFN?.diffFromLastMonth ?? 0}
            subtitle="mês passado"
            icon={<DollarSign className="h-4 w-4 text-foreground" />}
            hasCanceledOrders
          />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </div>
  );
};
