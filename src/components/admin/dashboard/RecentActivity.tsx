import React from 'react';
import Link from 'next/link';

interface Order {
  id: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  courseTitle: string;
  amount: number;
  status: string;
  date: Date;
}

interface RecentActivityProps {
  orders: Order[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ orders }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'failed':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bd-dashboard-recent-activity">
      <div className="bd-dashboard-section-header mb-20">
        <h5 className="bd-dashboard-section-title">Recent Orders</h5>
        <Link href="/admin/orders" className="bd-dashboard-view-all">
          View All <i className="fa-light fa-arrow-right"></i>
        </Link>
      </div>
      <div className="bd-dashboard-table-wrapper">
        <table className="table bd-dashboard-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Course</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No recent orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="bd-dashboard-order-id">{order.orderId}</span>
                  </td>
                  <td>
                    <div className="bd-dashboard-customer-info">
                      <strong>{order.customerName}</strong>
                      <br />
                      <small className="text-muted">{order.customerEmail}</small>
                    </div>
                  </td>
                  <td>{order.courseTitle}</td>
                  <td>
                    <strong>${order.amount.toFixed(2)}</strong>
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td>{formatDate(order.date)}</td>
                  <td>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="fa-light fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
