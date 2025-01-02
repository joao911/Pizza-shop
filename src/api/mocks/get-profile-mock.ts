import { http, HttpResponse, HttpHandler } from "msw";
import { getProfileResponse } from "../getProfile";

export const getProfileMock: HttpHandler = http.get<
  never,
  never,
  getProfileResponse
>("/me", () => {
  return HttpResponse.json({
    createdAt: new Date("04/01/2022"),
    email: "joaopaulolacerda911.com",
    id: "1",
    name: "João Paulo Lacerda",
    phone: "11970154082",
    role: "manager",
    updatedAt: new Date("04/01/2022"),
  });
});
