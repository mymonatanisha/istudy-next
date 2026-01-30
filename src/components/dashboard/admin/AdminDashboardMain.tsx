import React from "react";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

const AdminDashboardMain = async () => {
  const auth = await getAuthUser();
  if (!auth || auth.role !== "ADMIN") {
    return (
      <div className="container">
        <div className="bd-dashboard-inner">
          <p className="text-center">You do not have access to the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const [userCount, courseCount, enrollmentCount, orderCount, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalAmount: true }, where: { status: "PAID" } }),
  ]);

  const revenue = Number(totalRevenue._sum.totalAmount ?? 0);

  return (
    <div className="container">
      <div className="bd-dashboard-inner">
        <div className="bd-dashboard-title-inner">
          <h4 className="bd-dashboard-title">Admin Overview</h4>
        </div>
        <div className="row gy-30">
          <div className="col-md-4">
            <div className="bd-counter-wrapper bd-counter-style-six">
              <div className="bd-counter-item">
                <div className="bd-counter-content">
                  <span className="bd-counter-icon bg-two">
                    <i className="fa-solid fa-users"></i>
                  </span>
                  <h2 className="bd-counter-title">{userCount}</h2>
                  <p>Total Users</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bd-counter-wrapper bd-counter-style-six">
              <div className="bd-counter-item">
                <div className="bd-counter-content">
                  <span className="bd-counter-icon bg-two">
                    <i className="fa-solid fa-book-open"></i>
                  </span>
                  <h2 className="bd-counter-title">{courseCount}</h2>
                  <p>Total Courses</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bd-counter-wrapper bd-counter-style-six">
              <div className="bd-counter-item">
                <div className="bd-counter-content">
                  <span className="bd-counter-icon bg-two">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </span>
                  <h2 className="bd-counter-title">{enrollmentCount}</h2>
                  <p>Total Enrollments</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bd-counter-wrapper bd-counter-style-six">
              <div className="bd-counter-item">
                <div className="bd-counter-content">
                  <span className="bd-counter-icon bg-two">
                    <i className="fa-solid fa-receipt"></i>
                  </span>
                  <h2 className="bd-counter-title">{orderCount}</h2>
                  <p>Total Orders</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bd-counter-wrapper bd-counter-style-six">
              <div className="bd-counter-item">
                <div className="bd-counter-content">
                  <span className="bd-counter-icon bg-two">
                    <i className="fa-solid fa-dollar-sign"></i>
                  </span>
                  <h2 className="bd-counter-title">${revenue.toFixed(2)}</h2>
                  <p>Total Revenue (Paid)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
