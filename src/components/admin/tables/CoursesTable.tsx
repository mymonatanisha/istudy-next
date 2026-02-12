'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/admin/common/SearchBar';
import Pagination from '@/components/admin/common/Pagination';
import StatusBadge from '@/components/admin/common/StatusBadge';

interface Course {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  instructor: string;
  instructorAvatar: string | null;
  price: number;
  students: number;
  revenue: number;
  status: string;
  rating: number;
  lessons: number;
}

const CoursesTable = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [currentPage, search, statusFilter]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        perPage: '10',
      });

      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/admin/courses?${params}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const result = await response.json();
      setCourses(result.courses);
      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="bd-dashboard-courses-table">
      <div className="bd-dashboard-section-header mb-20">
        <h5 className="bd-dashboard-section-title">Course Management</h5>
      </div>

      <div className="row g-3 mb-20">
        <div className="col-md-6">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search by title or instructor..."
          />
        </div>
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
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
                  <th>Course</th>
                  <th>Instructor</th>
                  <th>Price</th>
                  <th>Students</th>
                  <th>Revenue</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      No courses found
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {course.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              style={{
                                width: '60px',
                                height: '40px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '60px',
                                height: '40px',
                                borderRadius: '4px',
                                background: '#f0f0f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <i className="fa-light fa-book"></i>
                            </div>
                          )}
                          <div>
                            <strong>{course.title}</strong>
                            <br />
                            <small className="text-muted">{course.lessons} lessons</small>
                          </div>
                        </div>
                      </td>
                      <td>{course.instructor}</td>
                      <td>${course.price.toFixed(2)}</td>
                      <td>{course.students}</td>
                      <td>${course.revenue.toFixed(2)}</td>
                      <td>
                        <i className="fa-solid fa-star text-warning"></i> {course.rating.toFixed(1)}
                      </td>
                      <td>
                        <StatusBadge status={course.status} />
                      </td>
                      <td>
                        <Link
                          href={`/course/${course.slug}`}
                          className="btn btn-sm btn-outline-primary"
                          target="_blank"
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

export default CoursesTable;
