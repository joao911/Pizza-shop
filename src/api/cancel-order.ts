import { api } from ".";

interface GetOrderCancelParams {
  orderId: string;
}

export async function cancelOrder({ orderId }: GetOrderCancelParams) {
  await api.patch(`/orders/${orderId}/cancel`);
}
