'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface UserGrowthChartProps {
  data: { date: string; users: number }[];
}

const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ data }) => {
  const series = [
    {
      name: 'Total Users',
      data: data.map(item => item.users),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'area',
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
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    colors: ['#28a745'],
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
          return value.toFixed(0);
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => {
          return value.toFixed(0) + ' users';
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
        <h5 className="bd-dashboard-chart-title">User Growth (Last 30 Days)</h5>
      </div>
      <div className="bd-dashboard-chart-body">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default UserGrowthChart;
