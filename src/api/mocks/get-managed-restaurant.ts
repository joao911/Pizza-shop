import { http, HttpResponse, HttpHandler } from "msw";
import { GetManagedRestaurant } from "../get-managed-restaurant";

export const getManagedRestaurantMock: HttpHandler = http.get<
  never,
  never,
  GetManagedRestaurant
>("/managed-restaurant", () => {
  return HttpResponse.json({
    createdAt: new Date("01/01/2022"),
    description: "Restaurante da esquina da cidade",
    id: "1",
    managerId: "1",
    name: "Pizza Shop",
    updatedAt: new Date("04/01/2022"),
  });
});
