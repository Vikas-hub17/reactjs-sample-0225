import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  background-color: #f4f5f7;
  min-height: 100vh;
`;

const Header = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const TaskList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const TaskCard = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  flex: 1 1 calc(33% - 30px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  min-width: 250px;

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 30px);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

const NavLinks = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  background-color: #0079bf;
  color: white;
  padding: 10px 15px;
  border-radius: 3px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005f8d;
  }
`;

function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  return (
    <Container>
      <Header>Task Board</Header>
      <TaskList>
        {tasks.map(task => (
          <TaskCard key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </TaskCard>
        ))}
      </TaskList>
      <NavLinks>
        <NavLink to="/profile">View Profile</NavLink>
        <NavLink to="/ethereum">Ethereum Status</NavLink>
      </NavLinks>
    </Container>
  );
}

export default TaskBoard;
