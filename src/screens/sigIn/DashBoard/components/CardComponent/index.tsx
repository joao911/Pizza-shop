import React from "react";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";

interface CardComponentProps {
  title: string;
  value: string;
  percentage: string;
  subtitle: string;

  icon?: React.ReactNode;
}
export const CardComponent: React.FC<CardComponentProps> = ({
  title,
  value,
  percentage,
  subtitle,
  icon,
}) => {
  return (
    <Card>
      <CardHeader className="spacey-8 flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-3xl font-bold tracking-tighter">{value}</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">
            {percentage}%
          </span>{" "}
          em relação {subtitle}
        </p>
      </CardContent>
    </Card>
  );
};
