import { http, HttpResponse, HttpHandler } from "msw";
import { SignInBody } from "../sign-in";

const loginMock: HttpHandler = http.post<never, SignInBody>(
  "/authenticate",
  async ({ request }) => {
    const { email } = await request.json();

    if (email === "j3eJp@example.com") {
      return new HttpResponse(null, {
        status: 201,
        headers: {
          "Set-Cookie": "auth=sample-jwt",
        },
      });
    }

    return new HttpResponse(null, { status: 401 });
  },
);

export default loginMock;
