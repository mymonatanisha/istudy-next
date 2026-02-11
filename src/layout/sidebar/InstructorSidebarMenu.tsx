"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type UserData = {
  name?: string;
};

const InstructorSidebarMenu = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [userName, setUserName] = useState<string>("User");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserName();
    }, []);

    const fetchUserName = async () => {
        try {
            const res = await fetch('/api/auth/me', { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                const user: UserData = data.user;
                
                // Use name or default to "User"
                const displayName = user.name || "User";
                setUserName(displayName);
            }
        } catch (error) {
            console.error('Failed to fetch user name:', error);
        } finally {
            setLoading(false);
        }
    };

    const menuItems = [
        { href: "/instructor-dashboard", icon: "fa-gauge-high", label: "Dashboard" },
        { href: "/instructor-profile", icon: "fa-id-badge", label: "My Profile" },
        { href: "/instructor-analytics", icon: "fa-chart-line", label: "Analytics" },
        { href: "/instructor-enrolled-courses", icon: "fa-book-reader", label: "Enrolled Courses" },
        { href: "/instructor-wishlist", icon: "fa-heart", label: "Wishlist" },
        { href: "/instructor-reviews", icon: "fa-comment-dots", label: "Reviews" },
        { href: "/instructor-purchase-history", icon: "fa-receipt", label: "Purchase History" },
    ];

    const instructorItems = [
        { href: "/instructor-courses", icon: "fa-chalkboard-user", label: "My Courses" },
        { href: "/instructor-announcements", icon: "fa-bullhorn", label: "Announcement" },
        { href: "/instructor-my-quiz-attempts", icon: "fa-file-lines", label: "My Quiz Attempts" },
        { href: "/instructor-assignments", icon: "fa-tasks", label: "Assignments" },
        { href: "/instructor-books", icon: "fa-book", label: "My Books" },
        { href: "/instructor-certificate", icon: "fa-award", label: "Certificate" },
    ];

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                router.push('/');
                router.refresh();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const userItems = [
        { href: "/instructor-settings", icon: "fa-sliders", label: "Settings" },
    ];

    return (
        <div className="col-xl-3 col-lg-3 col-md-4">
            <div className="bd-dashboard-menu">
                <h6 className="bd-dashboard-menu-title mt-0">
                    Welcome, {loading ? '...' : userName}
                </h6>
                <ul>
                    {menuItems.map(({ href, icon, label }) => (
                        <li key={href}>
                            <Link href={href} className={pathname === href ? "active" : ""}>
                                <span><i className={`fa-light ${icon}`}></i></span> {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <h6 className="bd-dashboard-menu-title">Instructor</h6>
                <ul>
                    {instructorItems.map(({ href, icon, label }) => (
                        <li key={href}>
                            <Link href={href} className={pathname === href ? "active" : ""}>
                                <span><i className={`fa-light ${icon}`}></i></span> {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <h6 className="bd-dashboard-menu-title">User</h6>
                <ul>
                    {userItems.map(({ href, icon, label }) => (
                        <li key={href}>
                            <Link href={href} className={pathname === href ? "active" : ""}>
                                <span><i className={`fa-light ${icon}`}></i></span> {label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button 
                            onClick={handleLogout} 
                            className="bd-dashboard-menu-logout-btn"
                        >
                            <span><i className="fa-light fa-sign-out-alt"></i></span> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default InstructorSidebarMenu;
