import React from "react";
import EarningCard from "./EarningCard";
import { EarningData } from "@/interFace/dashboard-interface";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

const InstructorDashboardMain = async () => {
    const auth = await getAuthUser();
    if (!auth) {
        return (
            <div className="col-xl-9 col-lg-9 col-md-8">
                <div className="bd-dashboard-inner">
                    <p className="text-center">Please sign in to view your instructor dashboard.</p>
                </div>
            </div>
        );
    }

    const courses = await prisma.course.findMany({
        where: { instructorId: auth.id },
        include: {
            enrollments: true,
            modules: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    const [activeCourses, totalStudents, totalEarnings] = await Promise.all([
        prisma.course.count({ where: { instructorId: auth.id, isPublished: true } }),
        prisma.enrollment.count({ where: { course: { instructorId: auth.id } } }),
        prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { course: { instructorId: auth.id }, status: "PAID" },
        }),
    ]);

    const earningsData: EarningData[] = [
        {
            icon: "fa-dollar-sign",
            amount: Number(totalEarnings._sum.totalAmount ?? 0),
            label: "Total Earnings",
            suffix: "$",
        },
        { icon: "fa-wallet", amount: Number(totalEarnings._sum.totalAmount ?? 0), label: "Current Balance", suffix: "$" },
        { icon: "fa-arrow-down", amount: 0, label: "Total Withdraws", suffix: "$" },
        { icon: "fa-book-open", amount: activeCourses, label: "Active Course", suffix: "+" },
        { icon: "fa-user-graduate", amount: totalStudents, label: "Total Student", suffix: "+" },
        { icon: "fa-receipt", amount: 0, label: "Deducted Fees", suffix: "$" },
    ];

    return (
        <div className="col-xl-9 col-lg-9 col-md-8">
            <div className="bd-dashboard-inner">
                {/* Earnings Section */}
                <div className="bd-dashboard-earnings-box mb-30">
                    <div className="bd-dashboard-title-inner">
                        <h4 className="bd-dashboard-title">Earnings</h4>
                    </div>
                    <div className="container p-0">
                        <div className="row gy-30 justify-content-center">
                            {earningsData.map((item, index) => (
                                <EarningCard key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course List Section */}
                <div className="bd-dashboard-course-area">
                    <div className="bd-dashboard-title-inner">
                        <h4 className="bd-dashboard-title">My Course List</h4>
                    </div>
                    <div className="bd-dashboard-course-table">
                        <div className="table-responsive">
                            <table className="table table-head-bg">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Modules</th>
                                        <th>Enrolled</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center">
                                                No courses yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        courses.map((course) => (
                                            <tr key={course.id}>
                                                <td>{course.title}</td>
                                                <td>{course.modules.length}</td>
                                                <td>{course.enrollments.length}</td>
                                                <td>{course.isPublished ? "Published" : "Draft"}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Browse Courses Button */}
                <div className="bd-more-button text-center mt-30">
                    <Link href="/courses-list-one" className="bd-btn btn-primary">
                        Browse All Courses
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboardMain;
