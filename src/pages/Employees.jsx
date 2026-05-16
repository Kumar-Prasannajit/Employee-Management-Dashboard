import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, deleteEmployeeAsync } from '../features/employees/employeeSlice.js';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import EmployeeFilters from '../components/employees/EmployeeFilters';
import EmployeeTable from '../components/employees/EmployeeTable';
import ConfirmModal from '../components/common/ConfirmModal.jsx';

export default function Employees() {
  const { employees, loading } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('All');
  const [dept, setDept] = useState('All');

  useEffect(() => { dispatch(fetchEmployees()); }, [dispatch]);

  const depts = useMemo(() => [...new Set(employees.map(e => e.department))].filter(Boolean), [employees]);

  const filtered = employees.filter(e =>
    e && 
    (e.name?.toLowerCase().includes(searchTerm.toLowerCase()) || e.role?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (status === 'All' || e.status === status) &&
    (dept === 'All' || e.department === dept)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await toast.promise(dispatch(deleteEmployeeAsync(selectedId)).unwrap(), {
        loading: "Deleting employee...",
        success: "Employee deleted successfully",
        error: "Failed to delete employee",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <Link to="/add-employee" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all"><Plus size={18} /> Add New</Link>
      </div>

      {/* Filters Section */}
      <EmployeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        status={status}
        setStatus={setStatus}
        dept={dept}
        setDept={setDept}
        depts={depts}
      />

      {/* Table Section */}
      <EmployeeTable
        employees={filtered}
        onDelete={handleDelete}
      />

      <ConfirmModal 
        isOpen={isModalOpen}
        title="Delete Employee"
        message="Are you sure you want to remove this employee? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />  

    </div>
  );
}
