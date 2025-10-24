import React, { useState } from 'react';
import { Sparkles, User, LogOut, TrendingUp, TrendingDown, Users, Briefcase, Eye, Clock, Target, Calendar, Filter, Download, ChevronDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Mock data for charts
  const applicantTrend = [
    { date: 'Week 1', applicants: 45, interviews: 12, hired: 3 },
    { date: 'Week 2', applicants: 52, interviews: 15, hired: 4 },
    { date: 'Week 3', applicants: 48, interviews: 18, hired: 5 },
    { date: 'Week 4', applicants: 65, interviews: 20, hired: 6 },
    { date: 'Week 5', applicants: 58, interviews: 16, hired: 4 },
    { date: 'Week 6', applicants: 72, interviews: 22, hired: 7 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 145, color: '#3b82f6' },
    { name: 'Design', value: 87, color: '#8b5cf6' },
    { name: 'Marketing', value: 65, color: '#ec4899' },
    { name: 'Sales', value: 92, color: '#10b981' },
    { name: 'Operations', value: 58, color: '#f59e0b' },
  ];

  const matchScoreDistribution = [
    { range: '90-100%', count: 45 },
    { range: '80-89%', count: 78 },
    { range: '70-79%', count: 112 },
    { range: '60-69%', count: 89 },
    { range: '50-59%', count: 43 },
    { range: '<50%', count: 21 },
  ];

  const topJobs = [
    { title: 'Senior Frontend Developer', applicants: 127, avgMatch: 84, status: 'Active' },
    { title: 'Full Stack Engineer', applicants: 98, avgMatch: 81, status: 'Active' },
    { title: 'Product Designer', applicants: 76, avgMatch: 78, status: 'Active' },
    { title: 'DevOps Engineer', applicants: 65, avgMatch: 86, status: 'Closed' },
    { title: 'Data Scientist', applicants: 54, avgMatch: 79, status: 'Active' },
  ];

  const stats = [
    { 
      label: 'Total Applicants', 
      value: '1,247', 
      change: '+12.5%', 
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    { 
      label: 'Avg Match Score', 
      value: '78%', 
      change: '+5.2%', 
      trend: 'up',
      icon: Target,
      color: 'purple'
    },
    { 
      label: 'Time to Hire', 
      value: '18 days', 
      change: '-3 days', 
      trend: 'up',
      icon: Clock,
      color: 'green'
    },
    { 
      label: 'Success Rate', 
      value: '24%', 
      change: '+2.1%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'orange'
    },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Top Navigation */}
      <nav className="bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ResuMatch AI</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">HR Manager</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-slate-400">Track your recruitment performance and insights</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Last 30 Days
                <ChevronDown className="w-4 h-4" />
              </button>
              {showTimeDropdown && (
                <div className="absolute top-full mt-2 right-0 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10 min-w-[150px]">
                  {['7d', '30d', '90d', '1y'].map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setTimeRange(range);
                        setShowTimeDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : range === '90d' ? 'Last 90 Days' : 'Last Year'}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-500/10 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === 'up' 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Applicant Trend Chart */}
          <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Applicant Trends</h2>
                <p className="text-sm text-slate-400">Weekly overview of applications and hiring</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={applicantTrend}>
                <defs>
                  <linearGradient id="colorApplicants" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="applicants" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorApplicants)" />
                <Area type="monotone" dataKey="interviews" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorInterviews)" />
                <Area type="monotone" dataKey="hired" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorHired)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Department Distribution */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">By Department</h2>
              <p className="text-sm text-slate-400">Applicant distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Match Score Distribution */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">Match Score Distribution</h2>
              <p className="text-sm text-slate-400">AI match score ranges</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={matchScoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="range" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performing Jobs */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">Top Performing Jobs</h2>
              <p className="text-sm text-slate-400">Most applications and best matches</p>
            </div>
            <div className="space-y-4">
              {topJobs.map((job, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold">{job.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === 'Active' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.applicants} applicants
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {job.avgMatch}% avg match
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                    <Eye className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur border border-blue-500/30 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Strong Growth</h3>
            <p className="text-sm text-slate-300">
              Applications increased by 32% this month. Your job postings are performing well in search rankings.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 backdrop-blur border border-purple-500/30 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">High Quality Matches</h3>
            <p className="text-sm text-slate-300">
              78% of applicants scored above 70% match. AI recommendations are improving candidate quality.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 backdrop-blur border border-green-500/30 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Faster Hiring</h3>
            <p className="text-sm text-slate-300">
              Time-to-hire decreased by 3 days. Streamlined screening process is showing results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}