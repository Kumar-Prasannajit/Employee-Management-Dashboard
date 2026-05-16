import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from './employeeAPI.js';

//Fetch employees
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async (_, thunkAPI) => {
    try {
        const data = await getEmployees()
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})


//Add employee
export const addEmployeeAsync = createAsyncThunk('employees/addEmployee', async (employee, thunkAPI) => {
    try {
        const data = await addEmployee(employee);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

//Update employee
export const updateEmployeeAsync = createAsyncThunk('employees/updateEmployee', async ({ id, employee }, thunkAPI) => {
    try {
        const data = await updateEmployee(id, employee);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

//Delete employee
export const deleteEmployeeAsync = createAsyncThunk('employees/deleteEmployee', async (id, thunkAPI) => {
    try {
        const data = await deleteEmployee(id);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    employees: [],
    loading: false,
    error: null
}

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addEmployeeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEmployeeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.employees.push(action.payload);
            })
            .addCase(addEmployeeAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateEmployeeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = state.employees.map((emp) => emp.id === action.payload.id ? action.payload : emp);
            })
            .addCase(updateEmployeeAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteEmployeeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = state.employees.filter((emp) => emp.id !== action.payload.id);
            })
            .addCase(deleteEmployeeAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default employeeSlice.reducer;