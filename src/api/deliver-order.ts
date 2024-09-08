import { api } from ".";

export interface DeliverOrderParams {
  orderId: string;
}

export async function deliverOrder({ orderId }: DeliverOrderParams) {
  await api.patch(`/orders/${orderId}/deliver`);
}
