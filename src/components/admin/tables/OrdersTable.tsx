'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Pagination from '@/components/admin/common/Pagination';
import StatusBadge from '@/components/admin/common/StatusBadge';

interface Order {
  id: number;
  orderId: string;
  fullName: string;
  email: string;
  customer: {
    id?: number;
    name: string;
    email: string;
    avatar?: string | null;
  };
  course: {
    id: number;
    title: string;
    price: number;
  } | null;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: string;
  createdAt: Date;
}

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        perPage: '10',
      });

      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/admin/orders?${params}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const result = await response.json();
      setOrders(result.orders);
      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bd-dashboard-orders-table">
      <div className="bd-dashboard-section-header mb-20">
        <h5 className="bd-dashboard-section-title">Order Management</h5>
      </div>

      <div className="row g-3 mb-20">
        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="bd-dashboard-table-wrapper">
            <table className="table bd-dashboard-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <span className="bd-dashboard-order-id">{order.orderId}</span>
                      </td>
                      <td>
                        <div>
                          <strong>{order.customer.name}</strong>
                          <br />
                          <small className="text-muted">{order.customer.email}</small>
                        </div>
                      </td>
                      <td>
                        {order.course ? (
                          <Link href={`/course/${order.course.id}`} className="text-decoration-none">
                            {order.course.title}
                          </Link>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td>
                        <strong>${order.amount.toFixed(2)}</strong>
                      </td>
                      <td>{order.paymentMethod}</td>
                      <td>
                        <code style={{ fontSize: '0.85em' }}>{order.transactionId}</code>
                      </td>
                      <td>
                        <StatusBadge status={order.status} />
                      </td>
                      <td>{formatDate(order.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersTable;
