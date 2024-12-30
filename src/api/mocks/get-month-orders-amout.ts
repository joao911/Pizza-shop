import { http, HttpResponse, HttpHandler } from "msw";
import { GetMonthOrdersAmountResponse } from "../get-month-order-amount";

export const geMonthOrdersAmountMock: HttpHandler = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>("/metrics/month-orders-amount", () => {
  return HttpResponse.json({
    amount: 100,
    diffFromLastMonth: 10,
  });
});
