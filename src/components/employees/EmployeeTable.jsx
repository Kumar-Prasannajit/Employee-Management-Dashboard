import { Link } from 'react-router-dom';
import { ExternalLink, Edit, Trash2, Users } from 'lucide-react';
import EmptyState from '../common/EmptyState';

export default function EmployeeTable({ employees, onDelete }) {
  if (employees.length === 0) {
    return (
      <EmptyState 
        title="No Results Found"
        message="We couldn't find any employees matching your search or filters. Try adjusting your criteria or adding a new employee."
        icon={Users}
      />
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
      <table className="w-full text-left">
        <thead className="text-xs uppercase text-white/30 border-b border-white/5">
          <tr>
            <th className="px-6 py-4">Employee</th>
            <th className="px-6 py-4">Department & Role</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-white/2 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center font-bold overflow-hidden text-indigo-400">
                    <img src={emp.image} alt="" className='w-full h-full object-cover' />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{emp.name}</p>
                    <p className="text-xs text-white/40">{emp.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-white/90">{emp.role}</p>
                <p className="text-xs text-indigo-400">{emp.department}</p>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                  {emp.status}
                </span>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <Link to={`/employees/${emp.id}`} className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white" title="View">
                  <ExternalLink size={16} />
                </Link>
                <Link to={`/edit-employee/${emp.id}`} className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-indigo-400" title="Edit">
                  <Edit size={16} />
                </Link>
                <button onClick={() => onDelete(emp.id)} className="p-1.5 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400" title="Delete">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
