import React from 'react';
import CountUp from 'react-countup';

interface StatsCardProps {
  title: string;
  value: number;
  trend: number;
  icon: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const StatsCards: React.FC<{ stats: any }> = ({ stats }) => {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Users',
      value: stats.users.total,
      trend: stats.users.trend,
      icon: 'fa-light fa-users',
      suffix: '',
    },
    {
      title: 'Total Courses',
      value: stats.courses.total,
      trend: stats.courses.trend,
      icon: 'fa-light fa-book',
      suffix: '',
    },
    {
      title: 'Total Revenue',
      value: stats.revenue.total,
      trend: stats.revenue.trend,
      icon: 'fa-light fa-dollar-sign',
      prefix: '$',
      decimals: 2,
    },
    {
      title: 'Active Enrollments',
      value: stats.enrollments.total,
      trend: stats.enrollments.trend,
      icon: 'fa-light fa-graduation-cap',
      suffix: '',
    },
  ];

  return (
    <div className="row g-4 mb-30">
      {cards.map((card, index) => (
        <div key={index} className="col-xl-3 col-lg-6 col-md-6">
          <div className="bd-dashboard-stats-card">
            <div className="bd-dashboard-stats-card-inner">
              <div className="bd-dashboard-stats-card-icon">
                <i className={card.icon}></i>
              </div>
              <div className="bd-dashboard-stats-card-content">
                <h4 className="bd-dashboard-stats-card-value">
                  {card.prefix}
                  <CountUp
                    end={card.value}
                    duration={2}
                    decimals={card.decimals || 0}
                  />
                  {card.suffix}
                </h4>
                <p className="bd-dashboard-stats-card-title">{card.title}</p>
                <div className={`bd-dashboard-stats-card-trend ${card.trend >= 0 ? 'positive' : 'negative'}`}>
                  <i className={`fa-solid ${card.trend >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                  <span>{Math.abs(card.trend).toFixed(1)}% vs last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
