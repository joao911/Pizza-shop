import React from "react";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { CardSkeleton } from "../CardSkeleton";

interface CardComponentProps {
  title: string;
  value: number | string;
  percentage: number;
  subtitle: string;
  icon?: React.ReactNode;
  hasCanceledOrders?: boolean;
  isLoading: boolean;
}
export const CardComponent: React.FC<CardComponentProps> = ({
  title,
  value,
  percentage,
  subtitle,
  icon,
  hasCanceledOrders,
  isLoading,
}) => {
  return (
    <Card>
      <CardHeader className="spacey-8 flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {icon}
      </CardHeader>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <CardContent className="space-y-1">
          <span className="text-3xl font-bold tracking-tighter">{value}</span>
          {!hasCanceledOrders && (
            <p className="text-xs text-muted-foreground">
              {percentage >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{percentage}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {percentage}%
                </span>
              )}{" "}
              em relação {subtitle}
            </p>
          )}
          {hasCanceledOrders && (
            <p className="text-xs text-muted-foreground">
              {percentage >= 0 ? (
                <span className="text-rose-500 dark:text-rose-400">
                  + {percentage}%
                </span>
              ) : (
                <span className="text-emerald-500 dark:text-emerald-400">
                  {percentage}%
                </span>
              )}{" "}
              em relação {subtitle}
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
};
