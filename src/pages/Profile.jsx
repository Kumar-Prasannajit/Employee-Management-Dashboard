import React from 'react'

const Profile = () => {
  // Fetch user data from local storage
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'Guest User',
    email: 'guest@example.com',
  }

  // Function to get initials from name
  const getInitials = (name) => {
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-slate-900 border border-slate-800 p-12 rounded-4xl shadow-2xl flex flex-col items-center gap-8 w-full max-w-sm">
        {/* Initials Circle */}
        <div className="w-28 h-28 rounded-full bg-indigo-500 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-indigo-500/10">
          {getInitials(user.name)}
        </div>

        {/* User Info */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {user.name}
          </h1>
          <p className="text-slate-400 text-lg font-medium">
            {user.email}
          </p>
        </div>

        {/* Administrator Badge (Optional but kept simple) */}
        <div className="pt-2">
            <span className="px-4 py-1.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-full uppercase tracking-widest border border-slate-700">
                Administrator
            </span>
        </div>
      </div>
    </div>
  )
}

export default Profile