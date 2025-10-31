// Row trong bảng thống kê
export interface StatRow {
  id: number;
  metric: string;
  value: number | string;
}

// Props cho component AdminDashboard
export interface AdminDashboardProps {
  stats: {
    users: number;
    fields: number;
    bookings: number;
    revenue: number;
  };
}