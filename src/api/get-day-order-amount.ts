import { api } from ".";

export interface getDayOrderAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDayOrderAmount() {
  const response = await api.get<getDayOrderAmountResponse>(
    "/metrics/day-orders-amount",
  );
  return response.data;
}
