# Employee Management Dashboard

A modern employee management dashboard built with React, Redux Toolkit, and Tailwind CSS v4.

## Getting Started

To run this project locally, you need to start both the development server and the mock backend.

### 1. Installation

Install the project dependencies:

```bash
npm install
```

### 2. Start the Backend (JSON Server)

The application uses `json-server` to mock the API. Start it in a separate terminal:

```bash
json-server --watch db.json --port 5000
```

### 3. Start the Frontend

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Features

- **Dashboard**: Overview of employee statistics and recent hires.
- **Employee Management**: Create, Read, Update, and Delete employee records.
- **Profile**: View logged-in user details.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Mock API**: JSON Server
