// import Card from "@/components/common/Card";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Row>
        <Col sm={12} md={4} children={<WebsiteAnalytics />} />
        <Col sm={12} md={4} children={<AverageDailySalesCard />} />
        <Col sm={12} md={4} children={<SalesOverviewCard />} />
      </Row>

      <Row>
        <Col sm={12} md={6} children={<SalesDashboardWithBarChart />} />
        <Col sm={12} md={6} children={<SalesDashboardWithPieChart />} />
      </Row>
    </>
  );
};

export default Dashboard;

// import React from "react";

interface StatItem {
  label: string;
  value: string;
}

const stats: StatItem[] = [
  { label: "Direct", value: "432" },
  { label: "Organic", value: "216" },
  { label: "Sessions", value: "29%" },
  { label: "Page Views", value: "2.3K" },
  { label: "Leads", value: "1.6K" },
  { label: "Conversions", value: "8%" },
];

export const WebsiteAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 w-full h-full">
      <h2 className="text-lg font-semibold text-gray-900">Website Analytics</h2>
      <p className="text-sm text-gray-500 mb-4">Total 28.5% Conversion Rate</p>

      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="bg-gray-100 text-gray-800 font-semibold text-sm px-3 py-1 rounded-md min-w-[3rem] text-center">
              {stat.value}
            </div>
            <div className="text-sm text-gray-800">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ("use client");

// import { Card, CardContent } from "@/components/ui/card";
import {
  // LineChart,
  // Line,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { ArrowDownRight } from "lucide-react";

const data = [
  { value: 24000 },
  { value: 20000 },
  { value: 25000 },
  { value: 21000 },
  { value: 28000 },
  { value: 22000 },
  { value: 28450 },
];

export const AverageDailySalesCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 w-full h-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">Average Daily Sales</p>
          <h2 className="text-2xl font-bold">$28,450</h2>
        </div>
        <ArrowDownRight className="text-red-500" size={18} />
      </div>
      <div className="h-24 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0f766e"
              fill="url(#colorSales)"
            />
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// "use client";

// import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const SalesOverviewCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 w-full h-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">Sales Overview</p>
          <h2 className="text-2xl font-bold">$42.5K</h2>
        </div>
        <ArrowUpRight className="text-green-500" size={18} />
      </div>

      <div
        className="flex justify-between items-center  text-sm text-gray-700"
        style={{ marginTop: "15%" }}
      >
        <div className="flex items-center gap-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
            62.2%
          </span>
          Orders
        </div>
        <div className="border-l h-4 mx-3 " />
        <div className="flex items-center gap-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
            25.5%
          </span>
          Visits
        </div>
      </div>

      <div className="w-full h-2 mt-4 rounded-full overflow-hidden bg-gray-200">
        <div className="h-full w-[60%] bg-green-500" />
        <div className="h-full w-[40%] bg-red-500" />
      </div>
    </div>
  );
};

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SalesDashboardWithBarChart: React.FC = () => {
  // Sample data for the bar chart
  const data = [
    { month: "Jan", revenue: 40 },
    { month: "Feb", revenue: 55 },
    { month: "Mar", revenue: 65 },
    { month: "Apr", revenue: 72 },
    { month: "May", revenue: 80 },
    { month: "Jun", revenue: 95 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 w-full">
      {/* Sales Overview Card */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold">$98.7K</h2>
        </div>
        <ArrowUpRight className="text-green-500" size={18} />
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
            80%
          </span>
          Target Achieved
        </div>
        <div className="border-l h-4 mx-3 mt-20" />
        <div className="flex items-center gap-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
            15%
          </span>
          Monthly Growth
        </div>
      </div>

      <div className="w-full h-2 mt-4 rounded-full overflow-hidden bg-gray-200">
        <div className="h-full w-[80%] bg-green-500" />
        <div className="h-full w-[20%] bg-red-500" />
      </div>

      {/* Bar Chart Section */}
      <div className="mt-8 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#34D399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

import { PieChart, Pie, Cell } from "recharts";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";

const SalesDashboardWithPieChart: React.FC = () => {
  // Sample data for the pie chart
  const data = [
    { name: "Target Achieved", value: 80 },
    { name: "Remaining", value: 20 },
  ];

  // Purple and gray colors for the pie chart segments
  const COLORS = ["#9B4DFF", "#E5E7EB"]; // Purple and gray

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 w-full ">
      {/* Sales Overview Card */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">Sales Overview</p>
          <h2 className="text-2xl font-bold">$98.7K</h2>
        </div>
        <ArrowUpRight className="text-green-500" size={18} />
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
            80%
          </span>
          Target Achieved
        </div>
        <div className="border-l h-4 mx-3 mt-20" />
        <div className="flex items-center gap-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
            15%
          </span>
          Monthly Growth
        </div>
      </div>

      <div className="w-full h-2 mt-4 rounded-full overflow-hidden bg-gray-200">
        <div className="h-full w-[80%] bg-green-500" />
        <div className="h-full w-[20%] bg-red-500" />
      </div>

      {/* Pie Chart Section */}
      <div className="mt-8 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}-${entry.value}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
