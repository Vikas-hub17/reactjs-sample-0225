import React from "react";
import styled from "styled-components";
import { FaPencilAlt, FaCheckCircle, FaRegCircle, FaBell, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, markComplete, openTaskModal, moveTask, deleteTask }) => {
  const isFutureTask = task.dueDate && new Date(task.dueDate) > new Date();

  return (
    <Card data-testid={`task-card-${task._id}`}>
      <TaskItem>
        {/* ✅ Clicking Circle Moves Task to "Completed" */}
        <Circle
          completed={task.status === "Completed"}
          data-testid={`mark-complete-${task._id}`}
          onClick={() => markComplete(task._id)}
        >
          {task.status === "Completed" ? <FaCheckCircle color="white" /> : <FaRegCircle />}
        </Circle>

        <TaskDetails>
          <TaskTitle>{task.title}</TaskTitle>
          <Preview>{task.description}</Preview>
          {isFutureTask && <FaBell color="#f39c12" title="Future task" />}
        </TaskDetails>

        <ActionButtons>
          {/* ✅ Edit Task Modal */}
          <EditIcon data-testid={`edit-task-${task._id}`} onClick={() => openTaskModal(task)}>
            <FaPencilAlt />
          </EditIcon>

          {/* ✅ Move Task Between Lists */}
          <Select
            value={task.status}
            data-testid={`move-task-${task._id}`}
            onChange={(e) => moveTask(task._id, e.target.value)}
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>

          {/* ✅ Delete Task (New Feature) */}
          <DeleteIcon
            data-testid={`delete-task-${task._id}`}
            onClick={() => deleteTask(task._id)}
          >
            <FaTrash />
          </DeleteIcon>
        </ActionButtons>
      </TaskItem>
    </Card>
  );
};

export default TaskCard;

// ✅ Styled Components
const Card = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ completed }) => (completed ? "green" : "gray")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${({ completed }) => (completed ? "green" : "white")};
  transition: background 0.3s ease-in-out;
`;

const TaskDetails = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const TaskTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const Preview = styled.div`
  font-size: 12px;
  color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const EditIcon = styled.div`
  cursor: pointer;
  color: #3498db;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #2980b9;
  }
`;

const Select = styled.select`
  padding: 4px;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  font-size: 12px;
`;

const DeleteIcon = styled.div`
  cursor: pointer;
  color: red;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: darkred;
  }
`;
