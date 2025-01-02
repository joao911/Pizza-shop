import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { getDaysOrdersAmountMock } from "./get-days-orders-amaunt";
import { geMonthCanceledOrdersAmountMock } from "./get-month-canceled-oreders-amount";
import { geMonthOrdersAmountMock } from "./get-month-orders-amout";
import loginMock from "./login-mock";
import { registerRestaurantMock } from "./register-restaurant-mock";
import { getRevenueOrdersAmountMock } from "./get-daily-revenue-in-period-mock";
import { getPopularProductsMock } from "./get-popular-products";
import { getProfileMock } from "./get-profile-mock";
import { getManagedRestaurantMock } from "./get-managed-restaurant";
import { updateProfileMock } from "./update-profile-mock";
import { getOrdersMock } from "./get-orders-mock";
import { getDetailsMock } from "./get-order-details-mock";
import { approveOrderMock } from "./approve-order-mock";
import { canceledOrderMock } from "./cancel-order-mock";
import { deliveredOrderMock } from "./deliver-order-mock";
import { dispatchOrderMock } from "./dispatch-order-mock";

export const worker = setupWorker(
  getDaysOrdersAmountMock,
  geMonthCanceledOrdersAmountMock,
  geMonthOrdersAmountMock,
  geMonthCanceledOrdersAmountMock,
  loginMock,
  registerRestaurantMock,
  getDaysOrdersAmountMock,
  getRevenueOrdersAmountMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getDetailsMock,
  approveOrderMock,
  canceledOrderMock,
  deliveredOrderMock,
  dispatchOrderMock,
);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }
  await worker.start();
}
