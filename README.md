# ReactJS TaskBoard Application

A full-stack task management application built with ReactJS (frontend) and Node.js/Express with MongoDB (backend). This project includes user authentication (login/signup), task CRUD operations, and Web3 wallet integration with MetaMask.

## Overview

This project is a task management application that allows users to sign up or log in, then manage tasks across three columns: "To-Do", "In Progress", and "Completed". Users can add, update, move, and delete tasks. The app also integrates with MetaMask for Web3 wallet connectivity, displaying wallet info on a dedicated page.

## Features

- **User Authentication:** Secure login/signup using JWT and MongoDB.
- **Task Management:** Create, update, move, and delete tasks with instant UI updates.
- **Task Board:** Organized into "To-Do", "In Progress", and "Completed" columns.
- **Web3 Integration:** Connect MetaMask to view wallet details.
- **Responsive Design:** Modern, interactive UI inspired by popular websites.
- **Testing:** Unit tests using Jest and React Testing Library.
- **Demo Video:** A demo video is available to showcase the application.

## Project Structure
reactjs-taskboard/ 
├── backend/ # Backend (Node.js/Express + MongoDB) │ ├── config/ │ │ └── db.js # MongoDB Connection Setup │ ├── controllers/ │ │ ├── authController.js # Login & Signup Logic │ │ └── taskController.js # Task CRUD Logic │ ├── middleware/ │ │ └── authMiddleware.js # Route Protection Middleware │ ├── models/ │ │ ├── Task.js # Task Schema │ │ └── User.js # User Schema │ ├── routes/ │ │ ├── authRoutes.js # Authentication Routes │ │ └── taskRoutes.js # Task API Routes │ ├── server.js # Main Express Server File │ └── package.json # Backend Dependencies 

├── frontend/ # Frontend (React) │ ├── public/ │ ├── src/ │ │ ├── components/ │ │ │ ├── LoginSignup.js # Login/Signup Component │ │ │ ├── TaskBoard.js # TaskBoard Component │ │ │ ├── TaskCard.js # TaskCard Component │ │ ├── tests/ # Test Files (Jest/React Testing Library) │ │ │ ├── LoginSignup.test.js │ │ │ ├── TaskBoard.test.js │ │ │ └── TaskCard.test.js │ │ ├── App.js # Main React App │ │ ├── index.js # App Entry Point │ │ └── globalStyles.js # Global Styles │ └── package.json # Frontend Dependencies └── README.md # This File

## Deployed Link:
https://reactjs-sample-0225.netlify.app/

## Demo Video:


---

## Instructions:
1. **Replace placeholders** (`your-backend.onrender.com`, `your-frontend.netlify.app`, `your-demo-video-id`) with actual URLs.
2. **Commit and push** the `README.md` file to your GitHub repository.

This README is well-structured for **GitHub**, making it easier for users to understand, install, test, and deploy your project! 🚀

