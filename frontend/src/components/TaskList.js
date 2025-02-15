import React from 'react';
import styled from 'styled-components';

const TaskContainer = styled.div`
  background: white;
  padding: 15px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TaskTitle = styled.h3`
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled.button`
  background: #0079bf;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
`;

function TaskList() {
  return (
    <TaskContainer>
      <TaskTitle>
        My Tasks
        <AddButton>+</AddButton>
      </TaskTitle>
    </TaskContainer>
  );
}

export default TaskList;
