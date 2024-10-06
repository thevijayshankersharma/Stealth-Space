# Stealth Space

**Stealth Space** is a web-based chat application that provides secure and encrypted real-time messaging. This project is built using modern web technologies like **Next.js** for the frontend, **Node.js** and **Express** for the backend, **Socket.IO** for real-time communication, and **JWT** for user authentication.

## Features
- **Real-time messaging** using WebSockets (Socket.IO)
- **End-to-End Encryption (E2EE)** for secure communication
- **User Authentication** using JWT (JSON Web Tokens)
- **MongoDB** for user data and message storage

## Tech Stack
- **Frontend**: Next.js (React framework)
- **Backend**: Node.js with Express.js
- **Real-Time Communication**: Socket.IO
- **Database**: MongoDB
- **Authentication**: JWT for user authentication

## Getting Started

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **MongoDB** (local instance or cloud with MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/stealth-space.git
   ```

2. Navigate to the project directory:

   ```bash
   cd stealth-space
   ```

### Setting Up the Frontend

1. Navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the Next.js development server:

   ```bash
   npm run dev
   ```

   The frontend should now be running at [http://localhost:3000](http://localhost:3000).

### Setting Up the Backend

1. Navigate to the `backend` folder:

   ```bash
   cd ../backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the `backend` folder with the following:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/stealth-space
   JWT_SECRET=your_jwt_secret
   ```

4. Run the backend server using **nodemon**:

   ```bash
   nodemon
   ```

   The backend should now be running at [http://localhost:5000](http://localhost:5000).

### Connecting Frontend and Backend

To connect the frontend and backend for real-time messaging, ensure that the `socket.io-client` in the frontend is pointing to the backend's WebSocket server at `http://localhost:5000`.

### Running the Application

Once both the frontend and backend are running, you should be able to:
- Sign up and log in with a user account.
- Chat with other users in real-time with encrypted messages.

## Contributing
If you'd like to contribute to **Stealth Space**, feel free to submit a pull request or open an issue.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Stealth-Space/
│
├── Backend/
│   ├── .env                         // Environment variables
│   ├── index.js                     // Entry point for the backend
│   ├── package.json                 // Backend dependencies and scripts
│   └── package-lock.json            // Exact versioning of installed dependencies
│   ├── models/                      // Models directory
│   │   ├── User.js                  // User model definition
│   │   └── Message.js               // Message model definition
│   ├── middleware/                  // Middleware directory
│   │   └── auth.js                  // Authentication middleware
│   ├── routes/                      // Routes directory
│   │   ├── userRoutes.js            // User-related routes
│   │   ├── chatRoutes.js            // Chat-related routes
│   │   └── authRoutes.js            // Authentication routes
│
├── Frontend/
│   ├── .eslintrc.json               // ESLint configuration
│   ├── jsconfig.json                // JavaScript configuration
│   ├── next.config.mjs              // Next.js configuration
│   ├── package.json                  // Frontend dependencies and scripts
│   ├── package-lock.json             // Exact versioning of installed dependencies
│   ├── postcss.config.mjs            // PostCSS configuration
│   ├── README.md                     // Frontend documentation
│   ├── tailwind.config.js            // Tailwind CSS configuration
│   ├── src/
│   │   ├── components/              // Reusable components directory
│   │   │   └── Chat.js              // Chat component
│   │   ├── pages/                   // Pages directory
│   │   │   ├── index.js             // Home component
│   │   │   ├── login.js             // Login component
│   │   │   ├── register.js          // Registration component
│   │   │   ├── dashboard.js          // Dashboard component
│   │   │   └── profile.js           // Profile component
│   │   └── styles/                  // Styles directory
│   │       └── globals.css          // Global styles file
│   │   └── utils/                   // Utility functions directory
│   │       └── socket.css           // Socket-related styles
│
└── README.md                         // Project overview and instructions

