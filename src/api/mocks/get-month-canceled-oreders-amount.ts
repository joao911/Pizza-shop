import { http, HttpResponse, HttpHandler } from "msw";
import { getMonthCanceledOrderAmountResponse } from "../get-month-canceled-order-amount";

export const geMonthCanceledOrdersAmountMock: HttpHandler = http.get<
  never,
  never,
  getMonthCanceledOrderAmountResponse
>("/metrics/month-canceled-orders-amount", () => {
  return HttpResponse.json({
    amount: 100,
    diffFromLastMonth: 10,
  });
});
