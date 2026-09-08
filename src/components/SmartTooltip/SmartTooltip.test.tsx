import { SmartTooltip } from "./SmartTooltip";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { memo, useState } from "react";
import React from "react";



describe("SmartTooltip component", () => {
  test("render children without tooltip on a initialization", () => {
    render(
      <SmartTooltip text="Подсказка для пользователя">
        <button>Наведи на меня</button>
      </SmartTooltip>,
    );
    const button = screen.getByRole("button", { name: "Наведи на меня" });
    expect(button).toBeInTheDocument();
    const tooltip = screen.queryByText("Подсказка для пользователя");
    expect(tooltip).not.toBeInTheDocument();
  });

  test("show a tooltip on hover", async () => {
    const user = userEvent.setup();
    render(
      <SmartTooltip text="Всплывающая подсказка">
        <button>Тестовая кнопка</button>
      </SmartTooltip>,
    );
    const button = screen.getByRole("button", { name: "Тестовая кнопка" });
    await user.hover(button);
    const tooltip = await screen.findByText("Всплывающая подсказка");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass("smart-tooltip");
  });

  test("hide a tooltip when the cursor moves away", async () => {
    const user = userEvent.setup();
    render(
      <SmartTooltip text="Скрываемая подсказка">
        <button>Кнопка</button>
      </SmartTooltip>,
    );
    const button = screen.getByRole("button", { name: "Кнопка" });
    await user.hover(button);
    const tooltip = await screen.findByText("Скрываемая подсказка");
    expect(tooltip).toBeInTheDocument();
    await user.unhover(button);
    await waitFor(() => {
      expect(
        screen.queryByText("Скрываемая подсказка"),
      ).not.toBeInTheDocument();
    });
  });

  test("don`t rerender when the same props", () => {
    const renderSpy = jest.fn();

    const SmartTooltipWithSpy = memo(
      (props: { text: string; children: React.ReactNode }) => {
        renderSpy();
        return <SmartTooltip {...props} />;
      },
      (prevProps, nextProps) => {
        return prevProps.text === nextProps.text;
      },
    );
    const Wrapper = () => {
      const [count, setCount] = useState(0);
      return (
        <div>
          <SmartTooltipWithSpy text="Текст подсказки">
            <button>Кнопка {count}</button>
          </SmartTooltipWithSpy>
          <button onClick={() => setCount(count + 1)}>
            Изменить состояние
          </button>
        </div>
      );
    };
    render(<Wrapper />);

    expect(renderSpy).toHaveBeenCalledTimes(1);
    const changeButton = screen.getByText("Изменить состояние");
    fireEvent.click(changeButton);
    expect(renderSpy).toHaveBeenCalledTimes(1);
    fireEvent.click(changeButton);
    expect(renderSpy).toHaveBeenCalledTimes(1);
  });

jest.mock("./hook/usePosition", () => ({
  usePosition: () => ({
    position: { top: "10px", left: "10px" },
    placement: "top",
    calculatePosition: jest.fn(),
    arrowPosition: "50%",
  }),
}));

  test("memo comparison function is called", () => {
    const Wrapper = () => {
      const [text, setText] = useState("Текст");
      return (
        <div>
          <SmartTooltip text={text}>
            <button>Кнопка</button>
          </SmartTooltip>
          <button onClick={() => setText("Другой текст")}>
            Изменить состояние
          </button>
        </div>
      );
    };
    render(<Wrapper />);
    const changeButton = screen.getByText("Изменить состояние");
    fireEvent.click(changeButton);
    const button = screen.getByText("Кнопка");
    fireEvent.mouseEnter(button);
    expect(screen.getByText("Другой текст")).toBeInTheDocument();
  });
});
