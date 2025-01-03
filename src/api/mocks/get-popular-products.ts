import { http, HttpResponse, HttpHandler } from "msw";
import { GetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductsMock: HttpHandler = http.get<
  never,
  never,
  GetPopularProductsResponse
>("/metrics/popular-products", () => {
  return HttpResponse.json([
    {
      product: "Pizza-chocolate",
      amount: 100,
    },
    {
      product: "Pizza-peperoni",
      amount: 10,
    },
    {
      product: "Pizza-portuguesa",
      amount: 10,
    },
  ]);
});
