import { http, HttpResponse, HttpHandler } from "msw";
import { registerRestaurantBody } from "../register-restaurant";

export const registerRestaurantMock: HttpHandler = http.post<
  never,
  registerRestaurantBody
>("/restaurants", async ({ request }) => {
  const { restaurantName } = await request.json();

  if (restaurantName === "Pizza Shop") {
    return new HttpResponse(null, {
      status: 200,
    });
  }

  return new HttpResponse(null, { status: 400 });
});
