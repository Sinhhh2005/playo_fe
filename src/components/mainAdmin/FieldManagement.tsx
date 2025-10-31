import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
	TextField,
	Button,
	IconButton,
	Stack,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
	getAllFields,
	updateFieldStatus,
	deleteField,
	updateField,
} from "../../services/fieldService";
import type { Venue } from "../../types";

const FieldManagement: React.FC = () => {
	const [fields, setFields] = useState<Venue[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 5;

	// 🧩 Modal edit
	const [openEdit, setOpenEdit] = useState(false);
	const [selectedField, setSelectedField] = useState<Venue | null>(null);
	const [formData, setFormData] = useState<
		Partial<Omit<Venue, "id" | "createdAt" | "updatedAt">>
	>({
		name: "",
		address: "",
		district: "",
		pricePerHour: 0,
		stock: 0,
		contactName: "",
		contactPhone: "",
		mapUrl: "",
		desShort: "",
		description: "",
		status: "active",
	});

	// 🧠 Fetch data
	const fetchFields = async (page: number) => {
		try {
			const res = await getAllFields(page, limit);
			setFields(res.data);
			setTotalPages(res.totalPages || 1);
		} catch (err) {
			console.error("Lỗi lấy danh sách sân:", err);
		}
	};

	useEffect(() => {
		fetchFields(page);
	}, [page]);

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	// ✅ Toggle status
	const handleToggleStatus = async (id: string, currentStatus: string) => {
		const newStatus = currentStatus === "active" ? "inactive" : "active";
		try {
			await updateFieldStatus(id, newStatus);
			toast.success(`✅ Đã chuyển trạng thái sang ${newStatus}`);
			fetchFields(page);
		} catch (err) {
			console.error("Lỗi cập nhật trạng thái:", err);
			toast.error("❌ Không thể cập nhật trạng thái");
		}
	};

	// ✅ Delete field
	const handleDelete = async (id: string) => {
		if (!window.confirm("Bạn có chắc muốn xóa sân này không?")) return;
		try {
			await deleteField(id);
			toast.success("🗑️ Xóa sân thành công");
			fetchFields(page);
		} catch (err) {
			console.error("Lỗi xóa sân:", err);
			toast.error("❌ Không thể xóa sân");
		}
	};

	const handleOpenEdit = (field: Venue) => {
		setSelectedField(field);
		setFormData({
			name: field.name,
			address: field.address,
			district: field.district || "",
			pricePerHour: Number(field.pricePerHour) || 0,
			stock: field.stock || 0,
			contactName: field.contactName || "",
			contactPhone: field.contactPhone || "",
			mapUrl: field.mapUrl || "",
			desShort: field.desShort || "",
			description: field.description || "",
			status: field.status || "active",
		});
		setOpenEdit(true);
	};

	// ✅ Đóng modal
	const handleCloseEdit = () => {
		setOpenEdit(false);
		setSelectedField(null);
	};

	// ✅ Xử lý change input
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// ✅ Gửi form update
	const handleSubmitEdit = async () => {
		if (!selectedField) return;
		try {
			await updateField(selectedField.id.toString(), formData);
			toast.success("✏️ Cập nhật sân thành công");
			handleCloseEdit();
			fetchFields(page);
		} catch (err) {
			console.error("Lỗi cập nhật sân:", err);
			toast.error("❌ Không thể cập nhật sân");
		}
	};

	return (
		<div className="flex flex-col flex-1 h-full relative">
			<Toaster position="top-right" />
			<div className="flex justify-between items-center my-4">
				<h2 className="text-xl font-semibold">Quản lý Sân</h2>
			</div>
			<TableContainer component={Paper} className="shadow-lg">
				<Table>
					<TableHead className="bg-gray-100">
						<TableRow>
							<TableCell>Tên sân</TableCell>
							<TableCell>Địa chỉ</TableCell>
							<TableCell>Thể thao</TableCell>
							<TableCell>Chủ sân</TableCell>
							<TableCell>Trạng thái</TableCell>
							<TableCell align="center">Hành động</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</TableContainer>
			{/* Bảng danh sách sân */}
			<div className="flex-1 overflow-y-auto">
				<TableContainer component={Paper} className="shadow-lg">
					<Table>
						<TableBody>
							{fields.map((f) => (
								<TableRow key={f.id}>
									<TableCell>{f.name}</TableCell>
									<TableCell>{f.address}</TableCell>
									<TableCell>
										{f.sport?.name || "N/A"}
									</TableCell>
									<TableCell>
										{f.owner?.name || "N/A"}
									</TableCell>
									<TableCell>
										<span
											className={`px-3 py-1 rounded-full text-sm font-medium ${
												f.status === "active"
													? "bg-green-100 text-green-700"
													: "bg-gray-200 text-gray-700"
											}`}
										>
											{f.status}
										</span>
									</TableCell>
									<TableCell align="center">
										<div className="flex gap-2 justify-center">
											{/* Edit */}
											<IconButton
												color="secondary"
												size="small"
												onClick={() =>
													handleOpenEdit(f)
												}
											>
												<Edit />
											</IconButton>

											{/* Delete */}
											<IconButton
												color="error"
												size="small"
												onClick={() =>
													handleDelete(
														f.id.toString()
													)
												}
											>
												<Delete />
											</IconButton>
											{/* Toggle */}
											<button
												onClick={() =>
													handleToggleStatus(
														f.id.toString(),
														f.status
													)
												}
												className="px-3 py-1  text-sm  bg-blue-500 text-white rounded hover:bg-blue-600"
											>
												{f.status === "active"
													? "Ẩn sân"
													: "Kích hoạt"}
											</button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			{/* Phân trang */}
			<div className="sticky bottom-0 left-0 right-0  py-3 z-10">
				<Stack spacing={2} alignItems="center">
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						color="primary"
					/>
				</Stack>
			</div>

			{/* 🧩 Modal Edit */}
			<Dialog
				open={openEdit}
				onClose={handleCloseEdit}
				fullWidth
				maxWidth="sm"
			>
				<DialogTitle>Chỉnh sửa thông tin sân</DialogTitle>
				<DialogContent className="flex flex-col gap-3 mt-2">
					<TextField
						fullWidth
						label="Tên sân"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Địa chỉ"
						name="address"
						value={formData.address}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Quận / Khu vực"
						name="district"
						value={formData.district}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Giá mỗi giờ (VNĐ)"
						name="pricePerHour"
						type="number"
						value={formData.pricePerHour ?? 0}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Số lượng sân (stock)"
						name="stock"
						type="number"
						value={formData.stock}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Tên người liên hệ"
						name="contactName"
						value={formData.contactName}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Số điện thoại liên hệ"
						name="contactPhone"
						value={formData.contactPhone}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Đường dẫn bản đồ (mapUrl)"
						name="mapUrl"
						value={formData.mapUrl}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Mô tả ngắn"
						name="desShort"
						value={formData.desShort}
						onChange={handleChange}
						multiline
						rows={2}
					/>
					<TextField
						fullWidth
						label="Mô tả chi tiết"
						name="description"
						value={formData.description}
						onChange={handleChange}
						multiline
						rows={3}
					/>
					<TextField
						fullWidth
						label="Trạng thái"
						name="status"
						select
						SelectProps={{ native: true }}
						value={formData.status}
						onChange={handleChange}
					>
						<option value="active">Kích hoạt</option>
						<option value="inactive">Ẩn</option>
					</TextField>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleCloseEdit}>Hủy</Button>
					<Button
						onClick={handleSubmitEdit}
						variant="contained"
						color="primary"
					>
						Lưu
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default FieldManagement;
