import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, deleteEmployeeAsync } from '../features/employees/employeeSlice';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building, 
  Briefcase, 
  DollarSign, 
  Calendar,
  Shield,
  MapPin,
  Edit,
  Trash2,
  Clock,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employees);
  const employee = employees.find(emp => emp.id.toString() === id);

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await toast.promise(dispatch(deleteEmployeeAsync(employee.id)).unwrap(), {
          loading: "Deleting employee...",
          success: "Employee deleted successfully",
          error: "Failed to delete employee",
        });
        navigate('/employees');
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white/70">Employee not found</h2>
        <Link to="/employees" className="text-indigo-400 mt-4 inline-block hover:underline">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header / Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          to="/employees" 
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </Link>
        <div className="flex gap-3">
          <Link 
            to={`/edit-employee/${employee.id}`}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl transition-all font-semibold text-sm"
          >
            <Edit size={16} />
            Edit Profile
          </Link>
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl transition-all font-semibold text-sm"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center text-center">
            <div className="h-32 w-32 rounded-3xl overflow-hidden bg-white/10 border border-white/10 mb-6 p-1">
              <img 
                src={employee.image || `https://ui-avatars.com/api/?name=${employee.name}&background=6366f1&color=fff&size=256`} 
                alt={employee.name}
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
            <h1 className="text-2xl font-bold">{employee.name}</h1>
            <p className="text-indigo-400 font-medium">{employee.role || employee.position}</p>
            <div className="mt-6 w-full pt-6 border-t border-white/5 space-y-4 text-left">
              <div className="flex items-center gap-3 text-white/60">
                <Mail size={18} className="text-white/20" />
                <span className="text-sm truncate">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Phone size={18} className="text-white/20" />
                <span className="text-sm">{employee.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin size={18} className="text-white/20" />
                <span className="text-sm">Remote / Head Office</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Performance</p>
                <p className="text-xl font-bold">98%</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Attendance</p>
                <p className="text-xl font-bold">100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Shield size={20} className="text-indigo-400" />
              Professional Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-1">
                <p className="text-xs font-bold text-white/30 uppercase tracking-wider">Department</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <Building size={18} />
                  </div>
                  <p className="font-semibold">{employee.department}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-bold text-white/30 uppercase tracking-wider">Salary Grade</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <DollarSign size={18} />
                  </div>
                  <p className="font-semibold">${parseInt(employee.salary).toLocaleString()}/year</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-white/30 uppercase tracking-wider">Employment Type</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <Clock size={18} />
                  </div>
                  <p className="font-semibold">Full-time</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-white/30 uppercase tracking-wider">Date Joined</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                    <Calendar size={18} />
                  </div>
                  <p className="font-semibold">Jan 12, 2024</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
              <h3 className="font-bold mb-4">About Employee</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {employee.name} is a dedicated professional in the {employee.department} department, currently serving as a {employee.role || employee.position}. They have consistently demonstrated excellence in their work and contribute significantly to the team's success.
              </p>
            </div>
          </div>

          {/* Activity Timeline Placeholder */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[
                { title: 'Project "Alpha" Completed', time: '2 days ago', icon: <CheckCircle2 className="text-emerald-400" /> },
                { title: 'Monthly Review meeting', time: '1 week ago', icon: <Clock className="text-indigo-400" /> },
                { title: 'New Equipment Requested', time: '2 weeks ago', icon: <Briefcase className="text-white/40" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      {item.icon}
                    </div>
                    {i !== 2 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-6 bg-white/10" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-white/40">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
