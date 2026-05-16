import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, LogOut, User } from 'lucide-react';

export default function Sidebar({ onLogout }) {
  const location = useLocation();
  
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Add New', path: '/add-employee', icon: UserPlus },
    { name: "Profile", path: "/profile", icon: User }
  ];

  return (
    <aside className="w-64 border-r border-white/5 bg-gray-900/50 hidden md:flex flex-col p-6 h-full">
      <div className="mb-10 text-xl font-bold tracking-tight text-white">
        Staff<span className="text-indigo-400">Sync</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <Link 
            key={link.path} 
            to={link.path} 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === link.path ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-white/60 hover:bg-white/5'
            }`}
          >
            <link.icon size={20} /> 
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}
      </nav>

      <button 
        onClick={onLogout} 
        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-auto font-medium"
      >
        <LogOut size={20} /> 
        Logout
      </button>
    </aside>
  );
}
