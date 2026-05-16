import { useState } from 'react';

export default function EmployeeForm({ initialData, onSubmit, onCancel, loading, title }) {
  const [formData, setFormData] = useState(initialData || { 
    name: '', email: '', phone: '', department: 'Engineering', role: '', salary: '', status: 'Active', image: '' 
  });

  return (
    <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" 
            name='image_url' 
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500 col-span-2" 
            value={formData.image} 
            onChange={e => setFormData({...formData, image: e.target.value})} 
            required 
            placeholder="Image URL" 
          />
          <input 
            placeholder="Full Name" 
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <input 
            placeholder="Email" 
            type="email" 
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            placeholder="Role" 
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500" 
            value={formData.role} 
            onChange={e => setFormData({...formData, role: e.target.value})} 
            required 
          />
          <select 
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none [&>option]:bg-slate-900" 
            value={formData.department} 
            onChange={e => setFormData({...formData, department: e.target.value})}
          >
            {['Engineering', 'Product', 'Design', 'Marketing', 'HR', 'Finance', 'Sales', 'Support'].map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <input 
            placeholder="Salary" 
            type="number" 
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500" 
            value={formData.salary} 
            onChange={e => setFormData({...formData, salary: e.target.value})} 
            required 
          />
          <select 
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none [&>option]:bg-slate-900" 
            value={formData.status} 
            onChange={e => setFormData({...formData, status: e.target.value})}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold disabled:opacity-50 transition-all"
          >
            {loading ? 'Processing...' : 'Save Employee'}
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
