import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Daily student activity: how many students booked sessions / completed them
const dailyActivityData = [
  { day: "Mon", booked: 12, completed: 10 },
  { day: "Tue", booked: 15, completed: 14 },
  { day: "Wed", booked: 10, completed: 8 },
  { day: "Thu", booked: 14, completed: 12 },
  { day: "Fri", booked: 18, completed: 15 },
  { day: "Sat", booked: 8, completed: 7 },
  { day: "Sun", booked: 5, completed: 4 },
];

// Student progress trend over weeks (average improvement in wellness scores)
const progressTrendData = [
  { week: "Week 1", progress: 45 },
  { week: "Week 2", progress: 52 },
  { week: "Week 3", progress: 60 },
  { week: "Week 4", progress: 67 },
  { week: "Week 5", progress: 70 },
  { week: "Week 6", progress: 75 },
];

// Issues discussed distribution
const issueDistributionData = [
  { name: "Anxiety", value: 30 },
  { name: "Stress", value: 25 },
  { name: "Depression", value: 20 },
  { name: "Academic Pressure", value: 15 },
  { name: "Other", value: 10 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function CounsellorAnalytics() {
  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      {/* Daily Student Activity */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Daily Student Activity</h2>
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
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Student Progress Trend</h2>
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
        <p className="text-sm text-gray-500 mt-2">+30% improvement in 6 weeks</p>
      </div>

      {/* Issues Distribution */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Issues Discussed</h2>
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
      <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-2">Key Counsellor Indicators</h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">87%</p>
            <p className="text-sm text-gray-500">Session Attendance</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">32</p>
            <p className="text-sm text-gray-500">Avg. Students Supported</p>
          </div>
        </div>
      </div>
    </div>
  );
}
