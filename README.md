
---

# Codex Clone

A Code editorlike LeetCode  built with Express.js, Mongoose, and React.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## Introduction

codex is a web application that provides a platform for practicing coding interview questions similar to the popular LeetCode platform. It allows users to solve coding problems, test their solutions, and track their progress. This project aims to replicate the core functionalities of LeetCode while providing a customizable and extensible codebase.

## Features

- **User Authentication:** Users can sign up, log in, and log out securely.
- **Problem Sets:** Users can browse through a collection of coding problems organized by categories.
- **Problem Details:** Each problem includes a description, input/output examples, and constraints.
- **Code Editor:** Users can solve problems directly in the browser using a code editor.
- **Solution Submission:** Users can submit their solutions for a problem and receive immediate feedback.


## Technologies Used

- **Express.js:** A minimalist web framework for Node.js used for building the backend server.
- **Mongoose:** An object modeling tool for MongoDB used for data modeling and interacting with the database.
- **React:** A JavaScript library for building user interfaces used for creating the frontend UI components.

- **JWT:** JSON Web Tokens used for secure user authentication and authorization.
- **monaco-editor:** A versatile text editor implemented in JavaScript for the browser used for the code editor component.
- **Tailwind CSS:** A popular CSS framework used for styling the frontend components.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js and npm (Node Package Manager)
- MongoDB
- Reactjs

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shaikhazrath/codex
   ```

2. Navigate to the project directory:

   ```bash
   cd codex
   ```

3. Install dependencies for both backend and frontend:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   
   - Create a `.env` file in the `backend` directory.
   - Define the following environment variables:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

5. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

6. Start the frontend development server:

   ```bash
   cd frontend
   npm start
   ```

7. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. Sign up or log in to your account.
2. Browse through the available problem sets.
3. Select a problem to solve and read its description.
4. Write your solution in the provided code editor.
5. Test your solution with sample inputs and outputs.
6. Submit your solution to see if it passes all test cases.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

