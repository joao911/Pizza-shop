import { http, HttpResponse, HttpHandler } from "msw";
import { getMonthRevenueOrderAmountResponse } from "../get-month-revenue";

export const geMonthCanceledOrdersAmountMock: HttpHandler = http.get<
  never,
  never,
  getMonthRevenueOrderAmountResponse
>("/metrics/month-receipt", () => {
  return HttpResponse.json({
    diffFromLastMonth: 10,
    receipt: 100,
  });
});
