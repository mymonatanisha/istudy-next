import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeClass = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'active':
      case 'published':
      case 'verified':
      case 'approved':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'failed':
      case 'cancelled':
      case 'rejected':
        return 'badge bg-danger';
      case 'draft':
      case 'archived':
        return 'badge bg-secondary';
      case 'in_progress':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  };

  return <span className={getBadgeClass(status)}>{status}</span>;
};

export default StatusBadge;
