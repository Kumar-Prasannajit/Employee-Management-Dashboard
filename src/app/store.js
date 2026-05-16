import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import employeeReducer from '../features/employees/employeeSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeeReducer
    }
});