import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import colors from "tailwindcss/colors";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDailyRevenueInPeriod } from "@/api/get-dayle-revenue-in-period";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { map } from "lodash";
import { formatCurrency } from "@/utils";

export const RevenueChart: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const { data: revenue } = useQuery({
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
    queryKey: ["metrics", "daily-revenue-in-period", dateRange],
  });

  const chartData = useMemo(() => {
    return map(revenue, (item) => {
      return {
        date: item.date,
        receipt: item.receipt / 100,
      };
    });
  }, [revenue]);

  console.log(chartData);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle>Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {chartData && (
          <ResponsiveContainer width="100%" height={248}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis
                dataKey={"date"}
                axisLine={false}
                tickLine={false}
                dy={6}
              />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={89}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey={"receipt"}
                stroke={colors.violet["500"]}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
