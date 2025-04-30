// src/components/ui/donut-chart.jsx
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#64748b', '#3b82f6'];

export const DonutChart = ({ data, netAmount }) => {
  return (
    <div className="relative h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            className={`text-2xl font-bold ${
              netAmount >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            ₹{Math.abs(netAmount).toLocaleString()}
          </text>
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            className="text-sm text-muted-foreground"
          >
            {netAmount >= 0 ? 'Net Gain' : 'Net Due'}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};