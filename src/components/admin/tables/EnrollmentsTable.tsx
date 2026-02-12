'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from '@/components/admin/common/Pagination';
import StatusBadge from '@/components/admin/common/StatusBadge';
import Link from 'next/link';

interface Enrollment {
  id: number;
  student: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
  };
  course: {
    id: number;
    title: string;
    slug: string;
    thumbnail: string | null;
    price: number;
    instructor: string;
  };
  status: string;
  progress: number;
  enrolledAt: Date;
  completedAt: Date | null;
}

const EnrollmentsTable = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchEnrollments = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        perPage: '10',
      });

      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/admin/enrollments?${params}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch enrollments');
      }

      const result = await response.json();
      setEnrollments(result.enrollments);
      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      console.error('Error fetching enrollments:', err);
      setError(err instanceof Error ? err.message : 'Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bd-dashboard-enrollments-table">
      <div className="bd-dashboard-section-header mb-20">
        <h5 className="bd-dashboard-section-title">Enrollment Management</h5>
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
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
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
                  <th>Student</th>
                  <th>Course</th>
                  <th>Instructor</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Enrolled Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No enrollments found
                    </td>
                  </tr>
                ) : (
                  enrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td>
                        <div>
                          <strong>{enrollment.student.name}</strong>
                          <br />
                          <small className="text-muted">{enrollment.student.email}</small>
                        </div>
                      </td>
                      <td>
                        <Link href={`/course/${enrollment.course.slug}`} className="text-decoration-none">
                          {enrollment.course.title}
                        </Link>
                      </td>
                      <td>{enrollment.course.instructor}</td>
                      <td>
                        <div className="progress" style={{ height: '8px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${enrollment.progress}%` }}
                            aria-valuenow={enrollment.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                        <small>{enrollment.progress.toFixed(0)}%</small>
                      </td>
                      <td>
                        <StatusBadge status={enrollment.status} />
                      </td>
                      <td>{formatDate(enrollment.enrolledAt)}</td>
                      <td>
                        <strong>${enrollment.course.price.toFixed(2)}</strong>
                      </td>
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

export default EnrollmentsTable;
