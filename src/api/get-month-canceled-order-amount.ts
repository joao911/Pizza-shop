import { api } from ".";

export interface getMonthCanceledOrderAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api.get<getMonthCanceledOrderAmountResponse>(
    "/metrics/month-canceled-orders-amount",
  );

  return response.data;
}
