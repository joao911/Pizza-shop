import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { getDaysOrdersAmountMock } from "./get-days-orders-amaunt";
import { geMonthCanceledOrdersAmountMock } from "./get-month-canceled-oreders-amount";
import { geMonthOrdersAmountMock } from "./get-month-orders-amout";
import loginMock from "./login-mock";
import { registerRestaurantMock } from "./register-restaurant-mock";
import { getRevenueOrdersAmountMock } from "./get-daily-revenue-in-period-mock";
import { getPopularProductsMock } from "./get-popular-products";

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
);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }
  await worker.start();
}
