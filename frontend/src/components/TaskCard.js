import React from "react";
import styled from "styled-components";
import { FaPencilAlt, FaCheck, FaBell } from "react-icons/fa";

const TaskCard = ({ task, markComplete, openTaskModal }) => {
  const isFutureTask = task.dueDate && new Date(task.dueDate) > new Date();

  return (
    <Card>
      <TaskItem>
        <Circle onClick={() => markComplete(task.id)} completed={task.completed}>
          {task.completed && <FaCheck color="white" />}
        </Circle>
        <TaskDetails>
          <TaskTitle>{task.title}</TaskTitle>
          <Preview>{task.details}</Preview>
          {isFutureTask && <FaBell />}
        </TaskDetails>
        <FaPencilAlt className="edit-icon" onClick={() => openTaskModal(task)} />
      </TaskItem>
    </Card>
  );
};

export default TaskCard;

const Card = styled.div`
  background: white;
  padding: 16px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${({ completed }) => (completed ? "green" : "white")};
`;

const TaskDetails = styled.div`
  flex-grow: 1;
`;

const TaskTitle = styled.div`
  font-weight: bold;
`;

const Preview = styled.div`
  font-size: 12px;
  color: gray;
`;
