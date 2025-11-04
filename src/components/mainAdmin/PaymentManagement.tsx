import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Pagination,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	IconButton,
	Stack,
	Chip,
	TextField,
	CircularProgress,
	Typography,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import { getAllPayments, deletePayment } from "../../services/paymentService";
import type { Payment } from "../../types/payment";

const PaymentManagement: React.FC = () => {
	const [payments, setPayments] = useState<Payment[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);
	const [openDetail, setOpenDetail] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState<Payment | null>(
		null
	);
	const limit = 5;

	const fetchPayments = async () => {
		setLoading(true);
		try {
			const res = await getAllPayments();
			setPayments(res || []);
			setTotalPages(Math.ceil((res?.length || 0) / limit));
		} catch (err) {
			console.error("Lỗi lấy danh sách payments:", err);
			toast.error("❌ Không thể tải danh sách thanh toán");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPayments();
	}, [page]);

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) =>
		setPage(value);

	const handleOpenDetail = (payment: Payment) => {
		setSelectedPayment(payment);
		setOpenDetail(true);
	};

	const handleCloseDetail = () => {
		setOpenDetail(false);
		setSelectedPayment(null);
	};

	const handleDelete = async (id: number) => {
		if (!window.confirm("Bạn có chắc muốn xoá thanh toán này?")) return;
		try {
			await deletePayment(id);
			toast.success("🗑️ Xóa thành công");
			fetchPayments();
		} catch (err) {
			console.error("Lỗi xoá:", err);
			toast.error("❌ Không thể xoá thanh toán");
		}
	};

	const paginated = payments.slice((page - 1) * limit, page * limit);

	return (
		<div className="flex flex-col flex-1 h-full relative">
			<Toaster position="top-right" />
			<div className="flex justify-between items-center my-4">
				<h2 className="text-xl font-semibold">Quản lý Thanh Toán</h2>
			</div>

			{loading ? (
				<div className="flex justify-center items-center py-10">
					<CircularProgress />
				</div>
			) : payments.length === 0 ? (
				<div className="flex justify-center py-10">
					<Typography color="textSecondary">
						Không có dữ liệu thanh toán
					</Typography>
				</div>
			) : (
				<>
					<TableContainer component={Paper} className="shadow-lg">
						<Table>
							<TableHead className="bg-gray-100">
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Người dùng</TableCell>
									<TableCell>Booking</TableCell>
									<TableCell>Phương thức</TableCell>
									<TableCell>Số tiền (VNĐ)</TableCell>
									<TableCell>Trạng thái</TableCell>
									<TableCell>Ngày tạo</TableCell>
									<TableCell align="center">
										Hành động
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{paginated.map((p) => (
									<TableRow key={p.id}>
										<TableCell>{p.id}</TableCell>
										<TableCell>
											{p.user?.name || "N/A"}
										</TableCell>
										<TableCell>#{p.bookingId}</TableCell>
										<TableCell>
											{p.paymentMethod || "N/A"}
										</TableCell>
										<TableCell>
											{p.booking?.totalPrice?.toLocaleString(
												"vi-VN"
											) || "N/A"}
										</TableCell>
										<TableCell>
											<Chip
												label={p.status}
												color={
													p.status === "complete"
														? "success"
														: p.status === "failed"
														? "error"
														: "warning"
												}
												size="small"
											/>
										</TableCell>
										<TableCell>
											{new Date(
												p.createdAt || ""
											).toLocaleDateString("vi-VN")}
										</TableCell>
										<TableCell align="center">
											<div className="flex gap-2 justify-center">
												<IconButton
													color="primary"
													size="small"
													onClick={() =>
														handleOpenDetail(p)
													}
												>
													<Visibility />
												</IconButton>
												<IconButton
													color="error"
													size="small"
													onClick={() =>
														handleDelete(p.id)
													}
												>
													<Delete />
												</IconButton>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					<div className="py-3 flex justify-center">
						<Stack spacing={2} alignItems="center">
							<Pagination
								count={totalPages}
								page={page}
								onChange={handlePageChange}
								color="primary"
							/>
						</Stack>
					</div>
				</>
			)}

			<Dialog open={openDetail} onClose={handleCloseDetail} fullWidth>
				<DialogTitle>Chi tiết thanh toán</DialogTitle>
				<DialogContent className="flex flex-col gap-3 mt-2">
					<TextField
						label="Mã thanh toán"
						value={selectedPayment?.id || ""}
						fullWidth
						disabled
					/>
					<TextField
						label="Phương thức"
						value={selectedPayment?.paymentMethod || ""}
						fullWidth
						disabled
					/>
					<TextField
						label="Trạng thái"
						value={selectedPayment?.status || ""}
						fullWidth
						disabled
					/>
					<TextField
						label="Số tiền"
						value={
							selectedPayment?.booking?.totalPrice?.toLocaleString(
								"vi-VN"
							) || ""
						}
						fullWidth
						disabled
					/>
					<TextField
						label="Người dùng"
						value={selectedPayment?.user?.name || ""}
						fullWidth
						disabled
					/>
					<TextField
						label="Ngày tạo"
						value={
							selectedPayment?.createdAt
								? new Date(
										selectedPayment.createdAt
								  ).toLocaleString("vi-VN")
								: ""
						}
						fullWidth
						disabled
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDetail}>Đóng</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default PaymentManagement;
