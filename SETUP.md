# Rapid Rescue Platform Setup Guide

## Prerequisites

1. Node.js (v14 or higher)
2. MongoDB (v4.0 or higher)
3. VS Code
4. Git

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/rapid-rescue.git
   cd rapid-rescue
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Edit `.env` with your credentials:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/rapid-rescue
     JWT_SECRET=your_jwt_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     OPENAI_API_KEY=your_openai_api_key
     NODE_ENV=development
     FRONTEND_URL=http://localhost:3000
     ```

5. **Start MongoDB**
   - Ensure MongoDB is running on your system
   - You can use MongoDB Compass for GUI management

6. **Start Backend Server**
   ```bash
   npm start
   ```
   The backend will run on http://localhost:5000

7. **Start Frontend Development Server**
   In a new terminal:
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on http://localhost:3000

## VS Code Configuration

1. **Recommended Extensions**
   - Prettier - Code formatter
   - ESLint
   - MongoDB
   - GitLens
   - Material Icon Theme
   - React-Native/React/Redux snippets

2. **Launch Configuration**
   - Create a `.vscode` folder in the root directory
   - Add `launch.json` for debugging:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "launch",
         "name": "Launch Backend",
         "skipFiles": [
           "<node_internals>/**"
         ],
         "program": "${workspaceFolder}/server.js",
         "preLaunchTask": "npm: install"
       },
       {
         "type": "chrome",
         "request": "launch",
         "name": "Launch Frontend",
         "url": "http://localhost:3000",
         "webRoot": "${workspaceFolder}/frontend/src",
         "preLaunchTask": "npm: frontend:install"
       }
     ]
   }
   ```

3. **Tasks Configuration**
   - Add `tasks.json` to `.vscode` folder:
   ```json
   {
     "version": "2.0.0",
     "tasks": [
       {
         "type": "npm",
         "script": "install",
         "problemMatcher": [],
         "group": {
           "kind": "build",
           "isDefault": true
         }
       },
       {
         "type": "npm",
         "script": "start",
         "problemMatcher": [],
         "group": {
           "kind": "build",
           "isDefault": true
         }
       }
     ]
   }
   ```

## Project Structure

```
rapid-rescue/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.js
│   └── package.json
├── .env
├── package.json
└── README.md
```

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the backend server in production mode

### `npm run dev`
Runs the backend server in development mode with nodemon

### `cd frontend && npm start`
Runs the frontend development server

## Features

1. User Authentication
   - Email/Phone signup
   - Login
   - Profile management

2. Professional Services
   - Legal Aid
   - Financial Support
   - Mental Health
   - Weekend Tutoring
   - Pet Care

3. Emergency Response
   - Real-time location tracking
   - Volunteer matching
   - Emergency escalation
   - AI-powered prioritization

4. Appointment System
   - Booking
   - Scheduling
   - Reminders
   - Cancellation

5. Document Verification
   - ID proof upload
   - Qualification verification
   - Certificate validation

## API Documentation

### Authentication
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me

### Users
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id

### Professionals
- POST /api/professionals
- GET /api/professionals
- GET /api/professionals/:id
- PUT /api/professionals/:id

### Appointments
- POST /api/appointments
- GET /api/appointments
- GET /api/appointments/:id
- PUT /api/appointments/:id

### Emergency Requests
- POST /api/requests
- GET /api/requests
- GET /api/requests/:id
- PUT /api/requests/:id

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
