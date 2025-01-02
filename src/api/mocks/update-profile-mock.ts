import { http, HttpResponse, HttpHandler } from "msw";
import { updateProfileBody } from "../updateProfile";

export const updateProfileMock: HttpHandler = http.put<
  never,
  never,
  updateProfileBody
>("/profile", () => {
  return HttpResponse.json({
    description: "Restaurante da esquina da cidade",
    name: "Pizza da esquina da cidade",
  });
});
