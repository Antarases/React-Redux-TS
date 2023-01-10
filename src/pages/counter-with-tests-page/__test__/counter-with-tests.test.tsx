import React from "react";
import { render, screen, fireEvent, cleanup, Matcher, MatcherOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom/extend-expect";

import CounterWithTestsPage from "../index";

function isElementInput(element: HTMLElement): element is HTMLInputElement {
    // Validate that element is actually an input
    return element instanceof HTMLInputElement;
}

function setup(jsx: JSX.Element) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    }
}

test("header renders with correct text", () => {
    setup(<CounterWithTestsPage />);

    const headerEl = screen.getByRole("heading", { level: 1 });

    expect(headerEl.textContent).toBe("My Counter");
});

test("counter initially starts with text of 0", () => {
    setup(<CounterWithTestsPage />);

    const counterEl = screen.getByTestId("counter");

    expect(counterEl.textContent).toBe("0");
});

test("input contains initial value of 1", () =>{
    setup(<CounterWithTestsPage />);

    const inputEl = screen.getByRole("spinbutton");

    if (isElementInput(inputEl)) {
        expect(inputEl.value).toBe("1");
    } else {
        throw `An element is not of type "HTMLInputElement"`;
    }
});

test(`subtract button renders with "-" sign`, () => {
    setup(<CounterWithTestsPage />);

    const subtractButton = screen.getByRole("button", { name: /^-$/ });

    expect(subtractButton.textContent).toBe("-");
});

test(`add button renders with "+" sign`, () => {
    setup(<CounterWithTestsPage />);

    const addButton = screen.getByRole("button", { name: /^\+$/i });

    expect(addButton.textContent).toBe("+");
});

test("changing value of input works correctly", () => {
    setup(<CounterWithTestsPage />);

    const inputEl = screen.getByRole("spinbutton");

    if (isElementInput(inputEl)) {
        expect(inputEl.value).toBe("1");

        fireEvent.change(inputEl, {
            target: {
                value: "5"
            }
        });

        expect(inputEl.value).toBe("5");
    } else {
        throw `An element is not of type "HTMLInputElement"`;
    }
});

test(`clicking on "-" button subtracts 1 from counter`, async () => {
    const { user } = setup(<CounterWithTestsPage />);

    const subtractButton = screen.getByRole("button", { name: /^-$/ });
    const counterEl = screen.getByTestId("counter");

    expect(counterEl.textContent).toBe("0");

    await user.click(subtractButton);

    expect(counterEl.textContent).toBe("-1");
});

test(`clicking on "+" button add 1 to counter`, async () => {
    const { user } = setup(<CounterWithTestsPage />);

    const addButton = screen.getByRole("button", { name: /^\+$/ });
    const counterEl = screen.getByTestId("counter");

    expect(counterEl.textContent).toBe("0");

    await user.click(addButton);

    expect(counterEl.textContent).toBe("1");
});

test(`changing input value then clicking on "-" button works correctly`, async () => {
    const { user } = setup(<CounterWithTestsPage />);

    const inputEl = screen.getByRole("spinbutton");
    const subtractButton = screen.getByRole("button", { name: /^-$/ });
    const counterEl = screen.getByTestId("counter");

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });

    await user.click(subtractButton);

    expect(counterEl.textContent).toBe("-5");
});

test(`changing input value then clicking on "+" button works correctly`, async () => {
    const { user } = setup(<CounterWithTestsPage />);

    const inputEl = screen.getByRole("spinbutton");
    const addButton = screen.getByRole("button", { name: /^\+$/ });
    const counterEl = screen.getByTestId("counter");

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });

    await user.click(addButton);

    expect(counterEl.textContent).toBe("5");
});

test("adding and then subtracting leads to the correct counter number", async () => {
    const { user } = setup(<CounterWithTestsPage />);

    const inputEl = screen.getByRole("spinbutton");
    const subtractButton = screen.getByRole("button", { name: /^-$/ });
    const addButton = screen.getByRole("button", { name: /^\+$/ });
    const counterEl = screen.getByTestId("counter");

    fireEvent.change(inputEl, {
        target: {
            value: "10"
        }
    });

    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);

    await user.click(subtractButton);
    await user.click(subtractButton);

    expect(counterEl.textContent).toBe("20");


    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });

    await user.click(addButton);

    await user.click(subtractButton);
    await user.click(subtractButton);

    expect(counterEl.textContent).toBe("15");
});
