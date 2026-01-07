"use client";

import React from 'react';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from 'recharts';

interface WeatherChartProps {
  data: any[];
}

const CustomXAxisTick = ({ x, y, payload }: any) => {
  if (!payload.value) return null;
  const [time, period] = payload.value.split(" "); 
  
  return (
    <g transform={`translate(${x},${y + 10})`}>
      <text
        x={0}
        y={0}
        textAnchor="middle"
        fill="currentColor"
        className="fill-black/60 dark:fill-white/60 font-medium text-[10px] md:text-xs select-none outline-none"
      >
        <tspan x="0" dy="0.5em">{time}</tspan>
        <tspan x="0" dy="1.3em" className="font-bold text-[8px] md:text-[9px] opacity-40 uppercase">
          {period}
        </tspan>
      </text>
    </g>
  );
};

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const chartData = data.map((h) => ({
    time: h.time,
    temp: h.temp,
    snow: h.isSnowing ? parseFloat(h.snowAmount) : 0,
  }));

  return (
    <div 
      className="w-full h-[300px] md:h-[400px] mt-8 bg-blue-100/30 dark:bg-blue-100/5 border border-white/20 dark:border-[#453c3c] rounded-[30px] p-2 md:p-6 backdrop-blur-sm overflow-hidden outline-none select-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart 
          data={chartData} 
          margin={{ top: 20, right: 10, bottom: 40, left: -20 }}
          /* 1. Removes the outline from the internal SVG */
          style={{ outline: 'none' }} 
        >
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.1} />
          
          <XAxis 
            dataKey="time" 
            tick={<CustomXAxisTick />} 
            interval={typeof window !== 'undefined' && window.innerWidth < 768 ? 3 : 1} 
            axisLine={false}
            tickLine={false}
          />
          
          <YAxis yAxisId="left" stroke="currentColor" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}°`} />
          <YAxis yAxisId="right" orientation="right" stroke="#60a5fa" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}cm`} />

          <Tooltip 
            /* 2. Disables the focusable vertical line (cursor) */
            cursor={false}
            contentStyle={{ 
              backgroundColor: 'rgba(23, 23, 23, 0.9)', 
              borderRadius: '16px', 
              border: 'none', 
              backdropFilter: 'blur(10px)',
              color: '#fff',
              outline: 'none'
            }}
          />

          <Area
            yAxisId="left"
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorTemp)"
            animationDuration={1500}
            /* 3. Disables the border/highlight on the dot when tapped */
            activeDot={{ r: 4, strokeWidth: 0 }}
          />

          <Bar 
            yAxisId="right" 
            dataKey="snow" 
            fill="#60a5fa" 
            radius={[4, 4, 0, 0]} 
            barSize={12}
            /* 4. Prevents the bar from showing a border/different color on tap */
            activeBar={{ stroke: 'none', fill: '#60a5fa' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;