import { http, HttpResponse, HttpHandler } from "msw";
import {
  GetOrderDetailsParams,
  getOrderDetailsResponse,
} from "../get-orer-details";

export const getDetailsMock: HttpHandler = http.get<
  GetOrderDetailsParams,
  never,
  getOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "Joao",
      phone: "11970154082",
      email: "joaopaulolacerda911.com",
    },
    createdAt: new Date("04/01/2022").toISOString(),
    status: "pending",
    totalInCents: 5000,
    orderItems: [
      {
        id: "1",
        priceInCents: 2400,
        product: {
          name: "Pizza",
        },
        quantity: 100,
      },
      {
        id: "2",
        priceInCents: 2600,
        product: {
          name: "Pizza de chocolate",
        },
        quantity: 10,
      },
      {
        id: "3",
        priceInCents: 600,
        product: {
          name: "Pizza portuguesa",
        },
        quantity: 5,
      },
    ],
  });
});
