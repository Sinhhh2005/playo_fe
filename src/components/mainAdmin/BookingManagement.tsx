import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Stack,
	Pagination,
	IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import {
	getAllBookings,
	updateBooking,
	deleteBooking,
} from "../../services/bookingService";
import type { Booking } from "../../types/booking";

const BookingManagement: React.FC = () => {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [openEdit, setOpenEdit] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
		null
	);
	const [status, setStatus] = useState("");

	const limit = 6;

	// 🧠 Fetch data
	const fetchBookings = async () => {
		try {
			const data = await getAllBookings();
			setBookings(data);
			setTotalPages(Math.ceil(data.length / limit));
		} catch (err) {
			console.error("Lỗi lấy danh sách booking:", err);
			toast.error("Không thể tải danh sách booking");
		}
	};

	useEffect(() => {
		fetchBookings();
	}, []);

	// ✅ Xử lý phân trang
	const currentData = bookings.slice((page - 1) * limit, page * limit);
	const handlePageChange = (_: any, value: number) => setPage(value);

	// ✅ Xử lý mở modal Edit
	const handleOpenEdit = (b: Booking) => {
		setSelectedBooking(b);
		setStatus(b.status);
		setOpenEdit(true);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
		setSelectedBooking(null);
	};

	// ✅ Cập nhật trạng thái booking
	const handleSubmitEdit = async () => {
		if (!selectedBooking) return;
		try {
			await updateBooking(selectedBooking.id, {
				status: status as "pending" | "confirmed" | "cancelled",
			});
			toast.success("✅ Cập nhật trạng thái thành công");
			fetchBookings();
			handleCloseEdit();
		} catch (err) {
			console.error("Lỗi cập nhật:", err);
			toast.error("❌ Không thể cập nhật booking");
		}
	};

	// ✅ Xoá booking
	const handleDelete = async (id: number) => {
		if (!window.confirm("Bạn có chắc muốn xoá booking này không?")) return;
		try {
			await deleteBooking(id);
			toast.success("🗑️ Xoá booking thành công");
			fetchBookings();
		} catch (err) {
			console.error("Lỗi xoá booking:", err);
			toast.error("Không thể xoá booking");
		}
	};

	return (
		<div className="flex flex-col flex-1 h-full">
			<Toaster position="top-right" />
			<div className="flex justify-between items-center my-4">
				<h2 className="text-xl font-semibold">📅 Quản lý Booking</h2>
			</div>

			<TableContainer component={Paper} className="shadow-lg">
				<Table>
					<TableHead className="bg-gray-100">
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Người đặt</TableCell>
							<TableCell>Sân</TableCell>
							<TableCell>Ngày</TableCell>
							<TableCell>Giờ</TableCell>
							<TableCell>Trạng thái</TableCell>
							<TableCell>Tổng tiền</TableCell>
							<TableCell align="center">Hành động</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currentData.map((b, idx) => (
							<TableRow key={b.id}>
								<TableCell>
									{(page - 1) * limit + idx + 1}
								</TableCell>
								<TableCell>{b.user?.name || "N/A"}</TableCell>
								<TableCell>{b.venue?.name || "N/A"}</TableCell>
								<TableCell>{b.bookingDate}</TableCell>
								<TableCell>
									{b.startTime} - {b.endTime}
								</TableCell>
								<TableCell>
									<span
										className={`px-3 py-1 rounded-full text-sm ${
											b.status === "confirmed"
												? "bg-green-100 text-green-700"
												: b.status === "pending"
												? "bg-yellow-100 text-yellow-700"
												: "bg-red-100 text-red-700"
										}`}
									>
										{b.status}
									</span>
								</TableCell>
								<TableCell>
									{b.totalPrice?.toLocaleString()}₫
								</TableCell>
								<TableCell align="center">
									<Stack
										direction="row"
										spacing={1}
										justifyContent="center"
									>
										<IconButton
											color="secondary"
											size="small"
											onClick={() => handleOpenEdit(b)}
										>
											<Edit />
										</IconButton>
										<IconButton
											color="error"
											size="small"
											onClick={() => handleDelete(b.id)}
										>
											<Delete />
										</IconButton>
									</Stack>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<div className="flex justify-center my-4">
				<Pagination
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					color="primary"
				/>
			</div>

			{/* Modal Edit */}
			<Dialog open={openEdit} onClose={handleCloseEdit}>
				<DialogTitle>Cập nhật trạng thái Booking</DialogTitle>
				<DialogContent>
					<div className="mt-2 flex flex-col gap-3">
						<label className="font-medium text-sm">
							Trạng thái:
						</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className="border px-3 py-2 rounded-md"
						>
							<option value="pending">Pending</option>
							<option value="confirmed">Confirmed</option>
							<option value="cancelled">Cancelled</option>
						</select>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseEdit}>Hủy</Button>
					<Button onClick={handleSubmitEdit} variant="contained">
						Lưu thay đổi
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default BookingManagement;
