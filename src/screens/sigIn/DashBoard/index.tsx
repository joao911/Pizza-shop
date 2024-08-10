import React from "react";
import { Helmet } from "react-helmet-async";
import { DollarSign, Utensils } from "lucide-react";

import { CardComponent } from "./components/CardComponent";
import { RevenueChart } from "./components/RevenueChart";
import { PopularProductsChart } from "./components/PopularProductsChart";

// import { Container } from './styles';

export const DashBoard: React.FC = () => {
  return (
    <div>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <CardComponent
            title="Recita total (mês) "
            value="R$ 15.000,00"
            percentage="10"
            subtitle="mês passado"
            icon={<DollarSign className="h-4 w-4 text-foreground" />}
          />
          <CardComponent
            title="Pedidos (mês) "
            value="245"
            percentage="10"
            subtitle="mês passado"
            icon={<Utensils className="h-4 w-4 text-foreground" />}
          />
          <CardComponent
            title="Pedidos  (dia) "
            value="12"
            percentage="10"
            subtitle="a ontem"
            icon={<Utensils className="h-4 w-4 text-foreground" />}
          />
          <CardComponent
            title="Cancelamento (mês) "
            value="32"
            percentage="10"
            subtitle="mês passado"
            icon={<DollarSign className="h-4 w-4 text-foreground" />}
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
