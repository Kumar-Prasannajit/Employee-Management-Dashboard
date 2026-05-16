import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import EmployeeDetails from './pages/EmployeeDetails.jsx'
import ManageEmployee from './pages/ManageEmployee.jsx'
import EmployeeList from './pages/Employees.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import DashboardLayout from './components/layout/DashboardLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },

  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'employees', element: <EmployeeList /> },
      { path: 'employees/:id', element: <EmployeeDetails /> },
      { path: 'add-employee', element: <ManageEmployee /> },
      { path: 'edit-employee/:id', element: <ManageEmployee /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App