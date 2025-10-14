import React from "react";
import {
	Card,
	CardContent,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import {
	PieChart,
	Pie,
	Cell,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

import type { StatRow, AdminDashboardProps } from "../../types/dashboard";

// Màu cho chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ stats }) => {
	// Dữ liệu bảng
	const tableData: StatRow[] = [
		{ id: 1, metric: "Số lượng User", value: stats.users },
		{ id: 2, metric: "Số lượng Sân", value: stats.fields },
		{ id: 3, metric: "Số Booking", value: stats.bookings },
		{
			id: 4,
			metric: "Doanh thu (VNĐ)",
			value: stats.revenue.toLocaleString(),
		},
	];

	// Dữ liệu cho chart
	const chartData = [
		{ name: "Users", value: stats.users },
		{ name: "Fields", value: stats.fields },
		{ name: "Bookings", value: stats.bookings },
		{ name: "Revenue", value: stats.revenue },
	];

	return (
		<div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
			{/* Bảng thống kê */}
			<Card className="shadow-lg">
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Thống kê tổng quan
					</Typography>
					<TableContainer component={Paper}>
						<Table>
							<TableHead className="bg-gray-100">
								<TableRow>
									<TableCell className="font-bold">
										#
									</TableCell>
									<TableCell className="font-bold">
										Chỉ số
									</TableCell>
									<TableCell className="font-bold">
										Giá trị
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{tableData.map((row) => (
									<TableRow key={row.id} hover>
										<TableCell>{row.id}</TableCell>
										<TableCell>{row.metric}</TableCell>
										<TableCell>{row.value}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>

			{/* Biểu đồ Donut */}
			<Card className="shadow-lg">
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Tỉ lệ phân bố
					</Typography>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={chartData}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={100}
								innerRadius={60}
								fill="#8884d8"
								label
							>
								{chartData.map((_, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			{/* Biểu đồ cột */}
			<Card className="shadow-lg md:col-span-2">
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Biểu đồ cột
					</Typography>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={chartData}>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="value" fill="#8884d8" />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminDashboard;
