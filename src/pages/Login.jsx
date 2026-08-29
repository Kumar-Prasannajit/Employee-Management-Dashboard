import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice.js'
import { Mail, Lock, User, LogIn, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Logic will be added by the user as per request
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      login({
        name: name,
        email: email,
        password: password
      })
    );
    toast.success("Login Success");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 relative overflow-hidden">
      {/* Background Blobs for Visual Interest */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 mb-4 border border-indigo-500/30">
              <User size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Practice Login</h1>
            <p className="text-slate-400 mt-2">Enter your details to start your session</p>
          </div>

          <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
  <p className="text-xs text-blue-200 leading-relaxed">
    This is a frontend demo project for showcasing UI and state management.
    Feel free to enter any sample credentials to explore the application.
    Authentication is not connected to a real backend, and the information you
    enter is not used for account creation or monitoring.
  </p>
</div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] mt-4"
            >
              <LogIn size={20} />
              Sign In
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-8">
            Don't have an account? <a href="#" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
