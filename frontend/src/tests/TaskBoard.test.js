import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import TaskBoard from "../components/TaskBoard";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  put: jest.fn()
}));

describe("TaskBoard Component", () => {
  test("renders TaskBoard component", () => {
    render(<TaskBoard />);
    expect(screen.getByText(/TaskBoard/i)).toBeInTheDocument();
  });

  test("fetches and displays tasks from API", async () => {
    const mockTasks = [
      { _id: "1", title: "Test Task", description: "Description", status: "To-Do" }
    ];
    axios.get.mockResolvedValueOnce({ data: mockTasks });

    render(<TaskBoard />);
    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
  });

  test("adds a new task", async () => {
    render(<TaskBoard />);
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    fireEvent.change(screen.getByPlaceholderText("Task Title"), { target: { value: "New Task" } });
    fireEvent.click(screen.getByText("Add Task"));

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });

  test("deletes a task", async () => {
    const mockTasks = [{ _id: "2", title: "Delete Me", status: "To-Do" }];
    axios.get.mockResolvedValueOnce({ data: mockTasks });

    render(<TaskBoard />);
    await waitFor(() => expect(screen.getByText("Delete Me")).toBeInTheDocument());

    fireEvent.click(screen.getByTestId(`delete-task-2`));
    await waitFor(() => expect(screen.queryByText("Delete Me")).not.toBeInTheDocument());
  });
});
