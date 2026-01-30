import React from "react";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

const statusClass = (status: string) => {
    if (status === "COMPLETED") return "badge-success";
    if (status === "ENROLLED") return "badge-warning";
    return "badge-danger";
};

const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);

const EnrolledCoursesTable = async () => {
    const auth = await getAuthUser();
    if (!auth) {
        return (
            <div className="bd-dashboard-course-table">
                <p className="text-center">Please sign in to view your enrolled courses.</p>
            </div>
        );
    }

    const enrollments = await prisma.enrollment.findMany({
        where: { userId: auth.id },
        include: {
            course: {
                include: {
                    instructor: true,
                },
            },
        },
        orderBy: { enrolledAt: "desc" },
        take: 10,
    });

    if (enrollments.length === 0) {
        return (
            <div className="bd-dashboard-course-table">
                <p className="text-center">No enrollments yet.</p>
            </div>
        );
    }

    return (
        <div className="bd-dashboard-course-table table-responsive">
            <table className="table table-head-bg">
                <thead>
                    <tr>
                        <th style={{ minWidth: "300px" }}>Course Name</th>
                        <th style={{ minWidth: "194px" }}>Instructor</th>
                        <th>Start Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map((enrollment) => (
                        <tr key={enrollment.id}>
                            <td>{enrollment.course.title}</td>
                            <td>{enrollment.course.instructor.name}</td>
                            <td>{formatDate(enrollment.enrolledAt)}</td>
                            <td>
                                <div className={`bd-badge ${statusClass(enrollment.status)}`}>
                                    {enrollment.status}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnrolledCoursesTable;
