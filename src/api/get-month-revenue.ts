import { api } from ".";

export interface getMonthRevenueOrderAmountResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await api.get<getMonthRevenueOrderAmountResponse>(
    "/metrics/month-receipt",
  );
  return response.data;
}
