'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface RevenueChartProps {
  data: { date: string; revenue: number }[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const series = [
    {
      name: 'Revenue',
      data: data.map(item => item.revenue),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#0b4dad'],
    xaxis: {
      categories: data.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      labels: {
        rotate: -45,
        rotateAlways: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => {
          return '$' + value.toFixed(0);
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => {
          return '$' + value.toFixed(2);
        },
      },
    },
    grid: {
      borderColor: '#f0f0f0',
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="bd-dashboard-chart-wrapper">
      <div className="bd-dashboard-chart-header">
        <h5 className="bd-dashboard-chart-title">Revenue (Last 30 Days)</h5>
      </div>
      <div className="bd-dashboard-chart-body">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default RevenueChart;
