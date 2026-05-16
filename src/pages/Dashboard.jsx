import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../features/employees/employeeSlice";
import {
  Users,
  UserCheck,
  UserMinus,
  Building2,
  Plus,
  FileText,
  TrendingUp,
  MoreVertical,
  ArrowUpRight,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { employees, loading } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: <Users className="text-blue-400" size={24} />,
      trend: "+12%",
      color: "from-blue-500/20 to-indigo-500/20",
      border: "border-blue-500/20"
    },
    {
      title: "Active Now",
      value: employees.filter(emp => emp.status?.toLowerCase() === "active").length,
      icon: <UserCheck className="text-emerald-400" size={24} />,
      trend: "+5%",
      color: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/20"
    },
    {
      title: "On Leave",
      value: employees.filter(emp => emp.status?.toLowerCase() === "inactive").length,
      icon: <UserMinus className="text-amber-400" size={24} />,
      trend: "-2%",
      color: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/20"
    },
    {
      title: "Departments",
      value: [...new Set(employees.map(emp => emp.department))].length,
      icon: <Building2 className="text-purple-400" size={24} />,
      trend: "Stable",
      color: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/20"
    }
  ];

  if (loading && employees.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
            Welcome back, {user?.name || "Admin"}
          </h1>
          <p className="text-white/50 mt-1 flex items-center gap-2">
            <Calendar size={16} />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/add-employee"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl transition-all font-semibold shadow-lg shadow-indigo-500/25"
          >
            <Plus size={20} />
            Add Employee
          </Link>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl transition-all font-semibold">
            <FileText size={20} />
            Reports
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-linear-to-br ${stat.color} ${stat.border} border backdrop-blur-md p-6 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              {stat.icon}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-white/50 text-sm font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Employees Table */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Recent Hires
              <span className="text-xs font-normal text-white/40 bg-white/5 px-2 py-1 rounded-full">Last 5</span>
            </h2>
            <Link to="/employees" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1">
              View All <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/30 text-xs uppercase tracking-wider">
                  <th className="pb-4 font-semibold">Employee</th>
                  <th className="pb-4 font-semibold">Role</th>
                  <th className="pb-4 font-semibold">Status</th>
                  <th className="pb-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[...employees].reverse().slice(0, 5).map((employee) => (
                  <tr key={employee.id} className="group hover:bg-white/2 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl overflow-hidden bg-white/10 border border-white/10">
                          <img
                            src={employee.image || `https://ui-avatars.com/api/?name=${employee.name}&background=6366f1&color=fff`}
                            alt={employee.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{employee.name}</p>
                          <p className="text-xs text-white/40">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="text-sm font-medium">{employee.role || employee.position}</p>
                      <p className="text-xs text-white/40">{employee.department}</p>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${employee.status?.toLowerCase() === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-white/5 text-white/40'
                        }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${employee.status?.toLowerCase() === 'active' ? 'bg-emerald-400' : 'bg-white/40'
                          }`} />
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Overview / Quick Actions */}
        <div className="space-y-8">
          {/* Department breakdown card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-6">Department Distribution</h2>
            
            {(() => {
              const deptCounts = employees.reduce((acc, emp) => {
                acc[emp.department] = (acc[emp.department] || 0) + 1;
                return acc;
              }, {});

              const colors = [
                '#6366f1', // Indigo
                '#10b981', // Emerald
                '#f59e0b', // Amber
                '#3b82f6', // Blue
                '#ec4899', // Pink
                '#8b5cf6', // Violet
                '#f43f5e', // Rose
                '#06b6d4', // Cyan
              ];

              const deptData = Object.entries(deptCounts).map(([name, count], index) => ({
                name,
                count,
                color: colors[index % colors.length]
              }));

              const total = employees.length;
              let currentPercentage = 0;
              const gradientParts = deptData.map((dept) => {
                const percentage = (dept.count / total) * 100;
                const part = `${dept.color} ${currentPercentage}% ${currentPercentage + percentage}%`;
                currentPercentage += percentage;
                return part;
              });

              return (
                <div className="flex flex-col items-center gap-8">
                  {/* Donut Chart */}
                  <div 
                    className="w-48 h-48 rounded-full relative group shadow-2xl transition-transform duration-500 hover:scale-105"
                    style={{
                      background: `conic-gradient(${gradientParts.join(', ')})`
                    }}
                  >
                    {/* Inner hole for donut effect */}
                    <div className="absolute inset-6 bg-[#0f172a] rounded-full flex flex-col items-center justify-center border border-white/5 backdrop-blur-xl">
                      <span className="text-4xl font-black text-white group-hover:scale-110 transition-transform">{total}</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Staff</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3">
                    {deptData.map((dept) => (
                      <div key={dept.name} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dept.color }} />
                          <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors">{dept.name}</span>
                        </div>
                        <span className="text-xs font-bold text-white/40">{Math.round((dept.count / total) * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Activity Placeholder */}
          <div className="bg-indigo-600/10 border border-indigo-500/20 backdrop-blur-md rounded-3xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <h2 className="font-bold">Team Growth</h2>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Your team has grown by <b>12%</b> this month. Great job in expanding the engineering department!
              </p>
              <button className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                View detailed analytics →
              </button>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-5">
              <TrendingUp size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;