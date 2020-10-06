import React from "react";
import Component from "./";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

test("it exists", () => {
  expect(render(<Component />)).toBeTruthy();
});
