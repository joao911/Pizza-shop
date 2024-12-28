import { render } from "@testing-library/react";
import { NavLink } from "./NavLink.index";
import { MemoryRouter } from "react-router-dom";

describe("NavLink", () => {
  it("should highlight the active link", () => {
    const wrapper = render(
      <>
        <NavLink to="/about">About </NavLink>
        <NavLink to="/">Home </NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
          );
        },
      },
    );

    expect(wrapper.getByText("Home").dataset.current).toEqual("false");
    expect(wrapper.getByText("About").dataset.current).toEqual("true");
  });
});
