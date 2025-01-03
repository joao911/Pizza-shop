import { http, HttpResponse, HttpHandler } from "msw";
import { getDayRevenueInPeriodResponse } from "../get-dayle-revenue-in-period";

export const getRevenueOrdersAmountMock: HttpHandler = http.get<
  never,
  never,
  getDayRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    {
      date: Number(new Date()),
      receipt: 100,
    },
  ]);
});
