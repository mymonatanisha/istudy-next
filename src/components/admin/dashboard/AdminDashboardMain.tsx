'use client';
import React, { useEffect, useState } from 'react';
import StatsCards from '@/components/admin/dashboard/StatsCards';
import RevenueChart from '@/components/admin/dashboard/RevenueChart';
import UserGrowthChart from '@/components/admin/dashboard/UserGrowthChart';
import RecentActivity from '@/components/admin/dashboard/RecentActivity';

interface DashboardData {
  stats: {
    users: { total: number; thisMonth: number; trend: number };
    courses: { total: number; thisMonth: number; trend: number };
    revenue: { total: number; thisMonth: number; trend: number };
    enrollments: { total: number; thisMonth: number; trend: number };
  };
  recentOrders: any[];
  charts: {
    revenue: { date: string; revenue: number }[];
    userGrowth: { date: string; users: number }[];
  };
}

const AdminDashboardMain = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/dashboard', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="col-xxl-9 col-xl-8 col-lg-8">
        <div className="bd-dashboard-content">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="col-xxl-9 col-xl-8 col-lg-8">
        <div className="bd-dashboard-content">
          <div className="alert alert-danger" role="alert">
            <h5 className="alert-heading">Error Loading Dashboard</h5>
            <p>{error || 'Failed to load dashboard data'}</p>
            <button className="btn btn-sm btn-danger" onClick={fetchDashboardData}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-xxl-9 col-xl-8 col-lg-8">
      <div className="bd-dashboard-content">
        <div className="bd-dashboard-content-inner">
          {/* Stats Cards */}
          <StatsCards stats={data.stats} />

          {/* Charts Row */}
          <div className="row g-4 mb-30">
            <div className="col-xl-6">
              <div className="bd-dashboard-widget white-bg">
                <RevenueChart data={data.charts.revenue} />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="bd-dashboard-widget white-bg">
                <UserGrowthChart data={data.charts.userGrowth} />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bd-dashboard-widget white-bg mb-30">
            <RecentActivity orders={data.recentOrders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
