import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../components/TaskCard";

describe("TaskCard Component", () => {
  const mockTask = { _id: "task1", title: "Test Task", description: "Task Desc", status: "To-Do" };
  const mockDeleteTask = jest.fn();
  const mockMarkComplete = jest.fn();

  test("renders TaskCard", () => {
    render(<TaskCard task={mockTask} deleteTask={mockDeleteTask} markComplete={mockMarkComplete} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("calls deleteTask when delete button is clicked", () => {
    render(<TaskCard task={mockTask} deleteTask={mockDeleteTask} markComplete={mockMarkComplete} />);
    fireEvent.click(screen.getByTestId(`delete-task-${mockTask._id}`));

    expect(mockDeleteTask).toHaveBeenCalledWith(mockTask._id);
  });

  test("marks task as completed when circle is clicked", () => {
    render(<TaskCard task={mockTask} deleteTask={mockDeleteTask} markComplete={mockMarkComplete} />);
    fireEvent.click(screen.getByTestId(`mark-complete-${mockTask._id}`));

    expect(mockMarkComplete).toHaveBeenCalledWith(mockTask._id);
  });
});
