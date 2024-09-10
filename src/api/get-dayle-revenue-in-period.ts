import { api } from ".";

export type getDayRevenueInPeriodResponse = {
  date: number;
  receipt: number;
}[];

export interface getDayRevenueInPeriodParams {
  from?: Date;
  to?: Date;
}

export async function getDailyRevenueInPeriod({
  from,
  to,
}: getDayRevenueInPeriodParams) {
  const response = await api.get<getDayRevenueInPeriodResponse>(
    "/metrics/daily-receipt-in-period",
    {
      params: {
        from,
        to,
      },
    },
  );
  return response.data;
}
