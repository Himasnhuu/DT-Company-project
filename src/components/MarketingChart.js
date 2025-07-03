'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const CHANNEL_COLORS = [
  '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
];

export default function MarketingChart({ data, type = 'roi' }) {
  if (type === 'conversion-pie') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ channel, conversions }) => `${channel}: ${conversions}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="conversions"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, 'Conversions']} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'cost-leads') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="channel" 
            angle={-45}
            textAnchor="end"
            height={100}
            fontSize={12}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'costIncurred') return [`₹${value.toLocaleString()}`, 'Cost Incurred'];
              return [value.toLocaleString(), name];
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="leads" fill="#3B82F6" name="Leads" />
          <Bar yAxisId="right" dataKey="costIncurred" fill="#EF4444" name="Cost Incurred (₹)" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Default ROI chart
  const roiData = [...data].map(channel => ({
    ...channel,
    roi: ((channel.avgLTV * channel.conversions - channel.costIncurred) / channel.costIncurred * 100).toFixed(1)
  })).sort((a, b) => b.roi - a.roi);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={roiData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="channel" 
          angle={-45}
          textAnchor="end"
          height={100}
          fontSize={12}
        />
        <YAxis />
        <Tooltip 
          formatter={(value) => [`${value}%`, 'ROI']}
        />
        <Legend />
        <Bar 
          dataKey="roi" 
          fill="#10B981" 
          name="ROI (%)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
