import { render } from "@testing-library/react";
import { OrderStatus } from ".";

// wrapper.debug(); !serve pra ver o html da componente que está sendo testado

describe("OrderStatus", () => {
  it("should display the right text when order status is pending", () => {
    //verificar se o texto "Pendente" aparece na tela
    const wrapper = render(<OrderStatus status="pending" />);
    const statusText = wrapper.getByText("Pendente");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });

  it("should display the right text when order status is canceled", () => {
    //verificar se o texto "Cancelado" aparece na tela
    const wrapper = render(<OrderStatus status="canceled" />);
    wrapper.debug();
    const statusText = wrapper.getByText("Cancelado");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-rose-500");
  });

  it("should display the right text when order status is processing", () => {
    //verificar se o texto "Em preparo" aparece na tela
    const wrapper = render(<OrderStatus status="processing" />);
    wrapper.debug();
    const statusText = wrapper.getByText("Em preparo");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  it("should display the right text when order status is delivering", () => {
    //verificar se o texto "Em entrega" aparece na tela
    const wrapper = render(<OrderStatus status="delivering" />);
    wrapper.debug();
    const statusText = wrapper.getByText("Em entrega");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  it("should display the right text when order status is delivered", () => {
    //verificar se o texto "Entregue" aparece na tela
    const wrapper = render(<OrderStatus status="delivered" />);
    wrapper.debug();
    const statusText = wrapper.getByText("Entregue");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });
});
