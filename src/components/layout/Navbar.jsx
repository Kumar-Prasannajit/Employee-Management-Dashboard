import { Search, Bell, Menu } from 'lucide-react';

export default function Navbar({ user, onMenuClick }) {
  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 sm:px-8 bg-[#0f172a]/60 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-3 md:hidden font-bold text-white">
        <button onClick={onMenuClick} className="p-2 -ml-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <Menu size={20} />
        </button>
        Staff<span className="text-indigo-400">Sync</span>
      </div>

      <div className="hidden md:flex flex-1 max-w-sm relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 text-sm text-white outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 border-l border-white/10 pl-4 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white leading-none">{user?.name || 'Admin'}</p>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider font-bold">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-indigo-600/20">
            {user?.name?.[0] || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}
