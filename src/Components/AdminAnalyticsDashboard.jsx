import React, { useState } from "react";
import Sidebar from "./InstitutionSidebar";
import { Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Data
const dailyActivityData = [
  { day: "Mon", booked: 12, completed: 10 },
  { day: "Tue", booked: 15, completed: 14 },
  { day: "Wed", booked: 10, completed: 8 },
  { day: "Thu", booked: 14, completed: 12 },
  { day: "Fri", booked: 18, completed: 15 },
  { day: "Sat", booked: 8, completed: 7 },
  { day: "Sun", booked: 5, completed: 4 },
];

const progressTrendData = [
  { week: "Week 1", progress: 45 },
  { week: "Week 2", progress: 52 },
  { week: "Week 3", progress: 60 },
  { week: "Week 4", progress: 67 },
  { week: "Week 5", progress: 70 },
  { week: "Week 6", progress: 75 },
];

const issueDistributionData = [
  { name: "Anxiety", value: 30 },
  { name: "Stress", value: 25 },
  { name: "Depression", value: 20 },
  { name: "Academic Pressure", value: 15 },
  { name: "Other", value: 10 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function StudentAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#eaf1f5] flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#eaf1f5]/80 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#c8ced1" }}>
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-[#f2f7eb]">
              <Users className="w-6 h-6 text-[#2e2f34]" />
            </button>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#3d9098]" />
              <span className="font-semibold text-[#2e2f34]">Student Analytics</span>
            </div>
            <div className="w-6" />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#3d9098] p-3 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#2e2f34] leading-tight">Student Analytics</h1>
                <p className="text-[#767272]">Track student activity, progress trends, and common issues</p>
              </div>
            </div>
          </div>

          {/* Analytics Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Student Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "#c8ced1" }}>
              <h2 className="text-lg font-bold mb-4 text-[#2e2f34]">Daily Student Activity</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="booked" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="completed" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Progress Trend */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "#c8ced1" }}>
              <h2 className="text-lg font-bold mb-4 text-[#2e2f34]">Student Progress Trend</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: "#22c55e" }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-[#767272] mt-2">+30% improvement in 6 weeks</p>
            </div>

            {/* Issues Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "#c8ced1" }}>
              <h2 className="text-lg font-bold mb-4 text-[#2e2f34]">Issues Discussed</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={issueDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {issueDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* KPIs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border flex flex-col items-center justify-center" style={{ borderColor: "#c8ced1" }}>
              <h2 className="text-lg font-bold mb-2 text-[#2e2f34]">Key Counsellor Indicators</h2>
              <div className="grid grid-cols-2 gap-6 mt-4 w-full">
                <div className="text-center p-4 rounded-lg border" style={{ borderColor: "#c8ced1" }}>
                  <p className="text-2xl font-bold text-[#2e2f34]">87%</p>
                  <p className="text-sm text-[#767272]">Session Attendance</p>
                </div>
                <div className="text-center p-4 rounded-lg border" style={{ borderColor: "#c8ced1" }}>
                  <p className="text-2xl font-bold text-[#2e2f34]">32</p>
                  <p className="text-sm text-[#767272]">Avg. Students Supported</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}