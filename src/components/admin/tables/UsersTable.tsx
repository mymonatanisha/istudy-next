'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/admin/common/SearchBar';
import Pagination from '@/components/admin/common/Pagination';
import StatusBadge from '@/components/admin/common/StatusBadge';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  roleId: number | null;
  enrolledCourses: number;
  totalSpent: number;
  createdAt: Date;
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        perPage: '10',
      });

      if (search) params.append('search', search);
      if (roleFilter) params.append('role', roleFilter);

      const response = await fetch(`/api/admin/users?${params}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result = await response.json();
      setUsers(result.users);
      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bd-dashboard-users-table">
      {/* Header */}
      <div className="bd-dashboard-section-header mb-20">
        <h5 className="bd-dashboard-section-title">User Management</h5>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-20">
        <div className="col-md-6">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search by name or email..."
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Roles</option>
            <option value="1">Admin</option>
            <option value="2">Instructor</option>
            <option value="3">Student</option>
          </select>
        </div>
      </div>

      {/* Table */}
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
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Enrolled Courses</th>
                  <th>Total Spent</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {user.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={user.avatar}
                              alt={user.name}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: '#0b4dad',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <strong>{user.name}</strong>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <StatusBadge status={user.role} />
                      </td>
                      <td>{user.enrolledCourses}</td>
                      <td>${user.totalSpent.toFixed(2)}</td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td>
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="fa-light fa-eye"></i> View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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

export default UsersTable;
