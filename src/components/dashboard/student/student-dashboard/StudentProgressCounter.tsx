import CountUpContent from "@/components/common/counter/CountUpContent";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { ICounterItem } from "@/interFace/dashboard-interface";
import React from "react";

const StudentProgressCounter = async () => {
    const auth = await getAuthUser();
    if (!auth) {
        return (
            <div className="col-12">
                <p className="text-center">Please sign in to see your progress.</p>
            </div>
        );
    }

    const [totalEnrollments, completedEnrollments, activeEnrollments] = await Promise.all([
        prisma.enrollment.count({ where: { userId: auth.id } }),
        prisma.enrollment.count({ where: { userId: auth.id, status: "COMPLETED" } }),
        prisma.enrollment.count({ where: { userId: auth.id, status: "ENROLLED" } }),
    ]);

    const counterData: ICounterItem[] = [
        { icon: "fa-solid fa-book-open", count: completedEnrollments, text: "Total Courses Taken" },
        { icon: "fa-solid fa-user-check", count: totalEnrollments, text: "Courses Enrolled" },
        { icon: "fa-solid fa-book-reader", count: activeEnrollments, text: "Active Courses" },
    ];

    return (
        <>
            {counterData.map((item, index) => (
                <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <div className="bd-counter-wrapper bd-counter-style-six">
                        <div className="bd-counter-item">
                            <div className="bd-counter-content">
                                <span className="bd-counter-icon bg-two">
                                    <i className={item.icon}></i>
                                </span>
                                <h2 className="bd-counter-title">
                                    <CountUpContent number={item.count} text={item.symbol || ""} />
                                </h2>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default StudentProgressCounter;
