import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import TaskCard from "./TaskCard";
import { BrowserProvider, formatEther } from "ethers";
import { FaCopy, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TaskBoard = () => {
  const dummyTasks = [
    { _id: "dummy1", title: "Design Homepage", description: "Create wireframe and UI design", dueDate: "2025-03-01T10:00", status: "To-Do" },
    { _id: "dummy2", title: "API Development", description: "Build authentication API", dueDate: "2025-03-05T12:00", status: "To-Do" },
    { _id: "dummy3", title: "Testing Features", description: "Perform unit and integration testing", dueDate: "2025-03-10T15:00", status: "To-Do" }
  ];
  const [tasks, setTasks] = useState(dummyTasks); // ✅ Preload Dummy Tasks
  const [profilePic, setProfilePic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", details: "", dueDate: "" });
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = " https://reactjs-sample-0225.onrender.com ";     //  "http://localhost:5000/api"

// ✅ Load tasks from MongoDB & Merge with Dummy Tasks
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks([...dummyTasks, ...data]); // ✅ Merge Dummy Tasks & MongoDB Tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  fetchTasks();
}, []);

  // Open Add Task Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle Input Change
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

// ✅ Delete Task (Handles MongoDB & UI)
const deleteTask = async (taskId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    setSelectedTask(null); // ✅ Close Modal After Deletion
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};


  // ✅ Add Task (Fix to instantly update UI)
  const addTask = async () => {
    if (!newTask.title) {
      alert("Task title is required!");
      return;
    }
    try {
      const { data } = await axios.post(`${API_BASE_URL}/tasks`, {
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        status: "To-Do", // ✅ FIX: Changed "list" to "status"
      });

      setTasks([...tasks, data]); // ✅ Instantly Update UI
      setNewTask({ title: "", description: "", dueDate: "" });
      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ✅ Move Task (Uses `updateTask` so it's not unused)
  const moveTask = async (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  // ✅ Click the Circle to Move Task to "Completed" (Uses `updateTask`)
  const markComplete = async (taskId) => {
    updateTask(taskId, { status: "Completed" });
  };

  // ✅ Update Task (For Dummy & MongoDB Tasks)
  const updateTask = async (taskId, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId ? { ...task, ...updates } : task
      )
    );

    if (!taskId.startsWith("dummy")) {
      try {
        await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updates);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  // Open Task Modal
  const openTaskModal = (task) => {
    setSelectedTask(task);
  };

  // Save Task Changes
  const saveTaskChanges = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setSelectedTask(null);
  };

  useEffect(() => {
    const fetchProfilePic = async () => {
      const randomId = Math.floor(Math.random() * 1000); // Random number between 0-999
      try {
        const response = await fetch(`https://picsum.photos/id/${randomId}/info`);
        const data = await response.json();
        setProfilePic(data.download_url);
      } catch (error) {
        console.error("Error loading profile image:", error);
      }
    };
    fetchProfilePic();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      // MetaMask is NOT installed
      const installMetaMask = window.confirm(
        "MetaMask is not installed. Would you like to install it now?"
      );
      if (installMetaMask) {
        window.open("https://metamask.io/download.html", "_blank");
      }
      return;
    }
  
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
  
      // Redirect to Wallet Info Page
      navigate("/wallet-info", {
        state: {
          address,
          balance: formatEther(balance),
        },
      });
    } catch (error) {
      console.error("Wallet Connection Error:", error);
    }
  };
  
  return (
    <Container>
      <Header>
        <Title>🛠 TaskBoard</Title>
        <RightSection>
          {walletAddress ? (
            <WalletBox>
              <WalletText>🔗 {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</WalletText>
              <WalletText>💰 {balance} ETH</WalletText>
            </WalletBox>
          ) : (
            <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
          )}
          {profilePic && <ProfileImage src={profilePic} alt="Profile" />}
        </RightSection>
      </Header>

      <TaskColumns>
        <TaskColumn>
          <h3>📌 To-Do</h3>
          {tasks.filter(task => task.status === "To-Do").map(task => (
            <TaskCard key={task.id} task={task} moveTask={moveTask} markComplete={markComplete} openTaskModal={openTaskModal} />
          ))}
        </TaskColumn>

        {/* In Progress Column */}
        <TaskColumn>
          <h3>⚙️ In Progress</h3>
          {tasks.filter(task => task.status === "In Progress").map(task => (
            <TaskCard key={task.id} task={task} moveTask={moveTask} markComplete={markComplete} openTaskModal={openTaskModal} />
          ))}
        </TaskColumn>

        <TaskColumn>
          <h3>✅ Completed</h3>
          {tasks.filter(task => task.status === "Completed").map(task => (
            <TaskCard key={task.id} task={task} completed />
          ))}
        </TaskColumn>
      </TaskColumns>

      {selectedTask && (
  <TaskModal>
    <ModalHeader>
      <h3>{selectedTask.title}</h3>
      <ModalIcons>
        <FaCopy onClick={() => navigator.clipboard.writeText(selectedTask.details)} />
        <FaTrash onClick={() => deleteTask(selectedTask._id)} style={{ color: "red", cursor: "pointer" }} />
        <FaTimes onClick={() => setSelectedTask(null)} />
      </ModalIcons>
    </ModalHeader>

    <Label>Details:</Label>
    <TextArea 
      value={selectedTask.details} 
      onChange={(e) => setSelectedTask({ ...selectedTask, details: e.target.value })} 
    />
    
    <Label>Due Date:</Label>
    <Input 
      type="datetime-local" 
      value={selectedTask.dueDate} 
      onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })} 
    />  

    <SaveButton onClick={() => saveTaskChanges(selectedTask)}>Save</SaveButton>
  </TaskModal>
)}


      {/* Floating Add Task Button */}
      <FloatingButton onClick={openModal}>
        <FaPlus />
      </FloatingButton>

      {/* Add Task Modal */}
      {isModalOpen && (
        <ModalOverlay>
          <Modal>
            <h3>Add New Task</h3>
            <Input
              type="text"
              name="title"
              placeholder="Task Title"
              value={newTask.title}
              onChange={handleChange}
            />
            <TextArea
              name="details"
              placeholder="Task Details"
              value={newTask.details}
              onChange={handleChange}
            />
            <Input
              type="datetime-local"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleChange}
            />
            <ModalActions>
              <Button onClick={addTask}>Add Task</Button>
              <ButtonCancel onClick={closeModal}>Cancel</ButtonCancel>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
 
    </Container>
  );
};


// Styled Components
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const TaskColumns = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const TaskColumn = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 8px;
  width: 30%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #1e448f, #4a69bd);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const TaskModal = styled.div`
  position: fixed;
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalIcons = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;
  cursor: pointer;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  margin-top: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;
  margin-top: 5px;
`;

const SaveButton = styled.button`
  background: #1e448f;
  color: white;
  padding: 10px;
  border: none;
  margin-top: 10px;
  width: 100%;
  cursor: pointer;
`;

const Logo = styled.h2`
margin: 0;
font-size: 30px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const Button = styled.button`
  background: #1e448f;
  color: white;
  border: none;
  padding: 10px;
  width: 48%;
  cursor: pointer;
  border-radius: 4px;
`;

const ButtonCancel = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 10px;
  width: 48%;
  cursor: pointer;
  border-radius: 4px;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #1e448f, #4a69bd);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
 
`;

const Title = styled.h2`
  font-weight: bold;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const WalletBox = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const WalletText = styled.span`
  font-weight: bold;
`;

const ConnectButton = styled.button`
  background: white;
  color: #1e448f;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #f1f1f1;
    transform: scale(1.05);
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
`;

export default TaskBoard;
