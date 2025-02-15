import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import LoginSignup from "../components/LoginSignup";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  put: jest.fn()
}));


describe("LoginSignup Component", () => {
  test("renders LoginSignup component", () => {
    render(
      <MemoryRouter>
        <LoginSignup />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login or Signup/i)).toBeInTheDocument();
  });

  test("updates input values when typed", () => {
    render(
      <MemoryRouter>
        <LoginSignup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    expect(screen.getByPlaceholderText("Email")).toHaveValue("test@example.com");
    expect(screen.getByPlaceholderText("Password")).toHaveValue("password123");
  });

  test("calls login API on form submit", async () => {
    const mockResponse = { data: { token: "test-token" } };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(
      <MemoryRouter>
        <LoginSignup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("test-token");
    });
  });

  test("calls signup API on form submit", async () => {
    axios.post.mockResolvedValueOnce({ data: "Signup successful!" });

    render(
      <MemoryRouter>
        <LoginSignup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText("Signup"));

    await waitFor(() => {
      expect(screen.getByText("Signup successful! Please log in.")).toBeInTheDocument();
    });
  });
});
