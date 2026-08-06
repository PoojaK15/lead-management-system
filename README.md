# Lead Desk Mini

Lead Desk Mini is a simple lead management web app with a React frontend and a Node.js/Express backend. It allows users to register, log in, manage leads, and view basic dashboard statistics.

## Project Structure

- frontend: React + Vite app under leadDesk-mini-UI/
- backend: Express server under server/

## Features

- User authentication (register/login)
- Lead creation and management
- Dashboard overview with lead stats
- Responsive UI for desktop and mobile

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express
- MongoDB
- JWT authentication

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or accessible remotely

### 1. Install dependencies

#### Frontend
```bash
cd leadDesk-mini-UI
npm install
```

#### Backend
```bash
cd server
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `server` directory with values such as:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Run the app

#### Start the backend
```bash
cd server
npm start
```

#### Start the frontend
```bash
cd leadDesk-mini-UI
npm run dev
```

## Notes

- Make sure MongoDB is available before starting the backend.
- Update the API base URL in the frontend if your backend runs on a different port.
