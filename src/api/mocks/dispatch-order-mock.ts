import { http, HttpResponse, HttpHandler } from "msw";
import { ApproveOrderParams } from "../aprove-order";

export const dispatchOrderMock: HttpHandler = http.patch<
  ApproveOrderParams,
  never,
  never
>("/orders/:orderId/dispatch", async ({ params }) => {
  if (params.orderId === "error-order-id") {
    return new HttpResponse(null, {
      status: 404,
    });
  }

  return new HttpResponse(null, {
    status: 204,
  });
});
