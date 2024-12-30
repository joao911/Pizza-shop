import { http, HttpResponse, HttpHandler } from "msw";
import { getDayOrderAmountResponse } from "../get-day-order-amount";

export const getDaysOrdersAmountMock: HttpHandler = http.get<
  never,
  never,
  getDayOrderAmountResponse
>("/metrics/day-orders-amount", () => {
  return HttpResponse.json({
    amount: 100,
    diffFromYesterday: 10,
  });
});
