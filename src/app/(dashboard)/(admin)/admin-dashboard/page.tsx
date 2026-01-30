import AdminDashboardMain from "@/components/dashboard/admin/AdminDashboardMain";
import Wrapper from "@/layout/DefaultWrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard - EnamNotes",
};

const AdminDashboard = () => {
  return (
    <Wrapper>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <AdminDashboardMain />
            </div>
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default AdminDashboard;
