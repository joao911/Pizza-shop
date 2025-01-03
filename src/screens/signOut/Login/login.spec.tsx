import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { Login } from ".";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/react-query";
import { HelmetProvider } from "react-helmet-async";

describe("NavLink", () => {
  it("should set default email input value is email is present on search params", () => {
    const wrapper = render(<Login />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <MemoryRouter
              initialEntries={["/login?email=joaopaulolacerda911@gmail.com"]}
            >
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        );
      },
    });

    wrapper.debug();
    const emailInput = wrapper.getByLabelText("Email") as HTMLInputElement;

    expect(emailInput.value).toEqual("joaopaulolacerda911@gmail.com");
  });
});
