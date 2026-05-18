import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, LogOut, User, X } from 'lucide-react';

export default function Sidebar({ onLogout, isOpen, onClose }) {
  const location = useLocation();
  
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Add New', path: '/add-employee', icon: UserPlus },
    { name: "Profile", path: "/profile", icon: User }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 border-r border-white/5 bg-[#0f172a] md:bg-gray-900/50 
        flex flex-col p-6 h-full transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="mb-10 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight text-white">
            Staff<span className="text-indigo-400">Sync</span>
          </div>
          <button onClick={onClose} className="md:hidden text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 space-y-2">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={onClose}
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
    </>
  );
}
