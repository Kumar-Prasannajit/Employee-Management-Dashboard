import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployeeAsync, updateEmployeeAsync, fetchEmployees } from '../features/employees/employeeSlice';
import toast from 'react-hot-toast';
import EmployeeForm from '../components/employees/EmployeeForm';

export default function ManageEmployee() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { employees } = useSelector((state) => state.employees);
  const employee = employees.find(emp => emp.id.toString() === id);

  useEffect(() => {
    if (id && employees.length === 0) dispatch(fetchEmployees());
  }, [dispatch, id, employees.length]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const action = id ? updateEmployeeAsync({ id, employee: formData }) : addEmployeeAsync(formData);
      await toast.promise(dispatch(action).unwrap(), {
        loading: `${id ? 'Updating' : 'Adding'} employee...`,
        success: `Employee ${id ? 'updated' : 'added'} successfully`,
        error: `Failed to ${id ? 'update' : 'add'} employee`,
      });
      navigate('/employees');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeForm 
      initialData={employee}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/employees')}
      loading={loading}
      title={id ? "Edit Employee" : "Add New Employee"}
    />
  );
}
