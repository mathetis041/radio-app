import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";

import React from "react";
import Show from "./Show";

test("renders learn react link", () => {
  render(<Show />);
  const headingElement = screen.getByRole("heading");
  expect(headingElement).toHaveTextContent(/This is it/i);

});
