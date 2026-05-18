import { Search } from 'lucide-react';

export default function EmployeeFilters({ searchTerm, setSearchTerm, status, setStatus, dept, setDept, depts }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
        <input 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 text-sm outline-none focus:border-indigo-500" 
          placeholder="Search employees..." 
        />
      </div>
      <div className="flex gap-2">
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none cursor-pointer text-white"
        >
          <option value="All" className="bg-gray-800">Status</option>
          <option value="Active" className="bg-gray-800">Active</option>
          <option value="Inactive" className="bg-gray-800">Inactive</option>
        </select>
        <select 
          value={dept} 
          onChange={(e) => setDept(e.target.value)} 
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none cursor-pointer text-white"
        >
          <option value="All" className="bg-gray-800">Department</option>
          {depts.map(d => <option key={d} value={d} className="bg-gray-800">{d}</option>)}
        </select>
      </div>
    </div>
  );
}
