import { api } from ".";

export interface GetOrdersQuery {
  pageIndex?: number | null;
}
export interface getOrderResponse {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders({ pageIndex }: GetOrdersQuery) {
  const response = await api.get<getOrderResponse>("/orders", {
    params: {
      pageIndex: pageIndex,
    },
  });
  return response.data;
}
