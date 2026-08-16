'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const AdminSidebarMenu = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const menuItems = [
    {
      path: '/admin',
      label: 'Dashboard',
      icon: 'fa-light fa-gauge',
    },
    {
      path: '/admin/users',
      label: 'Users',
      icon: 'fa-light fa-users',
    },
    {
      path: '/admin/courses',
      label: 'Courses',
      icon: 'fa-light fa-book',
    },
    {
      path: '/admin/blog',
      label: 'Blog',
      icon: 'fa-light fa-newspaper',
    },
    {
      path: '/admin/orders',
      label: 'Orders',
      icon: 'fa-light fa-shopping-cart',
    },
    {
      path: '/admin/enrollments',
      label: 'Enrollments',
      icon: 'fa-light fa-graduation-cap',
    },
    {
      path: '/admin/revenue',
      label: 'Revenue',
      icon: 'fa-light fa-chart-line',
    },
    {
      path: '/admin/settings',
      label: 'Settings',
      icon: 'fa-light fa-cog',
    },
  ];

  return (
    <div className="col-xxl-3 col-xl-4 col-lg-4">
      <div className="bd-sidebar-wpr mb-60">
        <div className="bd-sidebar-widgets">
          <div className="bd-sidebar-widgets-inner">
            <div className="bd-sidebar-widget-wrapper">
              <div className="bd-sidebar-widget">
                <div className="bd-sidebar-widget-title">
                  <h4 className="fs-20">Admin Menu</h4>
                </div>
                <div className="bd-sidebar-widget-content">
                  <ul className="bd-sidebar-menu-list">
                    {menuItems.map((item) => (
                      <li key={item.path} className={isActive(item.path) ? 'active' : ''}>
                        <Link href={item.path}>
                          <i className={item.icon}></i>
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebarMenu;
