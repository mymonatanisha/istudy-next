'use client';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface RevenueData {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    platformFee: number;
    instructorShare: number;
    platformCommission: number;
  };
  charts: {
    monthlyRevenue: { month: string; revenue: number }[];
  };
  topCourses: { id: number; title: string; revenue: number; students: number }[];
  topInstructors: { id: number; name: string; earnings: number; coursesCount: number; studentsCount: number }[];
}

const RevenueDashboard = () => {
  const [data, setData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/revenue', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch revenue data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching revenue data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load revenue data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="alert alert-danger">{error || 'Failed to load revenue data'}</div>;
  }

  const barChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
    },
    colors: ['#0b4dad'],
    xaxis: {
      categories: data.charts.monthlyRevenue.map(item => item.month),
    },
    yaxis: {
      labels: {
        formatter: (value: number) => '$' + value.toFixed(0),
      },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: '#f0f0f0' },
  };

  const barChartSeries = [
    {
      name: 'Revenue',
      data: data.charts.monthlyRevenue.map(item => item.revenue),
    },
  ];

  return (
    <div className="bd-dashboard-revenue">
      <div className="bd-dashboard-section-header mb-20">
        <h5 className="bd-dashboard-section-title">Revenue Dashboard</h5>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-30">
        <div className="col-xl-3 col-lg-6">
          <div className="bd-dashboard-stats-card">
            <div className="bd-dashboard-stats-card-inner">
              <div className="bd-dashboard-stats-card-icon">
                <i className="fa-light fa-dollar-sign"></i>
              </div>
              <div className="bd-dashboard-stats-card-content">
                <h4 className="bd-dashboard-stats-card-value">
                  $<CountUp end={data.stats.totalRevenue} duration={2} decimals={2} />
                </h4>
                <p className="bd-dashboard-stats-card-title">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="bd-dashboard-stats-card">
            <div className="bd-dashboard-stats-card-inner">
              <div className="bd-dashboard-stats-card-icon">
                <i className="fa-light fa-shopping-cart"></i>
              </div>
              <div className="bd-dashboard-stats-card-content">
                <h4 className="bd-dashboard-stats-card-value">
                  <CountUp end={data.stats.totalOrders} duration={2} />
                </h4>
                <p className="bd-dashboard-stats-card-title">Total Orders</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="bd-dashboard-stats-card">
            <div className="bd-dashboard-stats-card-inner">
              <div className="bd-dashboard-stats-card-icon">
                <i className="fa-light fa-chart-line"></i>
              </div>
              <div className="bd-dashboard-stats-card-content">
                <h4 className="bd-dashboard-stats-card-value">
                  $<CountUp end={data.stats.averageOrderValue} duration={2} decimals={2} />
                </h4>
                <p className="bd-dashboard-stats-card-title">Avg Order Value</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="bd-dashboard-stats-card">
            <div className="bd-dashboard-stats-card-inner">
              <div className="bd-dashboard-stats-card-icon">
                <i className="fa-light fa-percentage"></i>
              </div>
              <div className="bd-dashboard-stats-card-content">
                <h4 className="bd-dashboard-stats-card-value">
                  <CountUp end={data.stats.platformCommission} duration={2} decimals={0} />%
                </h4>
                <p className="bd-dashboard-stats-card-title">Platform Commission</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bd-dashboard-widget white-bg mb-30">
        <div className="bd-dashboard-chart-header">
          <h5 className="bd-dashboard-chart-title">Monthly Revenue (Last 12 Months)</h5>
        </div>
        <div className="bd-dashboard-chart-body">
          <ReactApexChart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>

      {/* Top Courses & Instructors */}
      <div className="row g-4">
        <div className="col-xl-6">
          <div className="bd-dashboard-widget white-bg">
            <div className="bd-dashboard-section-header mb-20">
              <h5 className="bd-dashboard-section-title">Top 10 Courses by Revenue</h5>
            </div>
            <div className="bd-dashboard-table-wrapper">
              <table className="table bd-dashboard-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Students</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topCourses.map((course, index) => (
                    <tr key={course.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-primary">{index + 1}</span>
                          <span>{course.title}</span>
                        </div>
                      </td>
                      <td>{course.students}</td>
                      <td>
                        <strong>${course.revenue.toFixed(2)}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="bd-dashboard-widget white-bg">
            <div className="bd-dashboard-section-header mb-20">
              <h5 className="bd-dashboard-section-title">Top 10 Instructors by Earnings</h5>
            </div>
            <div className="bd-dashboard-table-wrapper">
              <table className="table bd-dashboard-table">
                <thead>
                  <tr>
                    <th>Instructor</th>
                    <th>Courses</th>
                    <th>Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topInstructors.map((instructor, index) => (
                    <tr key={instructor.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-success">{index + 1}</span>
                          <span>{instructor.name}</span>
                        </div>
                      </td>
                      <td>{instructor.coursesCount}</td>
                      <td>
                        <strong>${instructor.earnings.toFixed(2)}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;
