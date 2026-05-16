// Employee API services
import axiosInstance from '../../services/axiosInstance.js'


//Get all employees
export const getEmployees = async () => {
    const response = await axiosInstance.get('/employees')
    return response.data
}

//Get employee by ID
export const getEmployeeById = async (id) => {
    const response = await axiosInstance.get(`/employees/${id}`)
    return response.data
}

//Add employee
export const addEmployee = async (employee) => {
    const response = await axiosInstance.post('/employees', employee)
    return response.data
}

//Update employee
export const updateEmployee = async (id, employee) => {
    const response = await axiosInstance.put(`/employees/${id}`, employee)
    return response.data
}

//Delete employee
export const deleteEmployee = async (id) => {
    const response = await axiosInstance.delete(`/employees/${id}`)
    return response.data
}
