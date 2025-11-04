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
	MenuItem,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
	getVenueSlots,
	updateVenueSlot,
	deleteVenueSlot,
} from "../../services/venusSlotService";
import type { VenueSlot } from "../../types/venueslot";

const SlotManagement: React.FC = () => {
	const [slots, setSlots] = useState<VenueSlot[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 8;

	// Modal edit only
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedSlot, setSelectedSlot] = useState<VenueSlot | null>(null);
	const [formData, setFormData] = useState<Partial<VenueSlot>>({
		venueId: 0,
		sportId: 0,
		level: "",
		date: "",
		startTime: "",
		endTime: "",
		isAvailable: true,
	});

	// Fetch slots
	const fetchSlots = async () => {
		try {
			const res = await getVenueSlots();
			setSlots(res);
			setTotalPages(Math.ceil(res.length / limit));
		} catch (err) {
			console.error("Lỗi lấy danh sách slot:", err);
			toast.error("❌ Lỗi khi tải danh sách slot");
		}
	};

	useEffect(() => {
		fetchSlots();
	}, []);

	const handlePageChange = (_: any, value: number) => setPage(value);

	// 🟢 Open edit dialog
	const handleOpenDialog = (slot: VenueSlot) => {
		setSelectedSlot(slot);
		setFormData({
			venueId: slot.venueId,
			sportId: slot.sportId,
			level: slot.level ?? "",
			date: slot.date ?? "",
			startTime: slot.startTime ?? "",
			endTime: slot.endTime ?? "",
			isAvailable: slot.isAvailable,
		});
		setOpenDialog(true);
	};

	const handleCloseDialog = () => setOpenDialog(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	// ✅ Only update slot
	const handleSubmit = async () => {
		if (!selectedSlot) return;
		try {
			await updateVenueSlot(selectedSlot.id, formData);
			toast.success("✏️ Cập nhật slot thành công");
			handleCloseDialog();
			fetchSlots();
		} catch (err) {
			console.error("Lỗi cập nhật slot:", err);
			toast.error("❌ Không thể cập nhật slot");
		}
	};

	// 🗑️ Delete slot
	const handleDelete = async (id: number) => {
		if (!window.confirm("Bạn có chắc muốn xóa slot này không?")) return;
		try {
			await deleteVenueSlot(id);
			toast.success("🗑️ Đã xóa slot thành công");
			fetchSlots();
		} catch (err) {
			console.error("Lỗi xóa slot:", err);
			toast.error("❌ Không thể xóa slot");
		}
	};

	// Pagination
	const startIndex = (page - 1) * limit;
	const paginatedSlots = slots.slice(startIndex, startIndex + limit);

	return (
		<div className="flex flex-col flex-1 h-full relative">
			<Toaster position="top-right" />
			<div className="flex justify-between items-center my-4">
				<h2 className="text-xl font-semibold">
					📅 Quản lý Slot (Giờ Sân)
				</h2>
			</div>

			<TableContainer component={Paper} className="shadow-lg">
				<Table>
					<TableHead className="bg-gray-100">
						<TableRow>
							<TableCell>Sân</TableCell>
							<TableCell>Thể thao</TableCell>
							<TableCell>Trình độ</TableCell>
							<TableCell>Ngày</TableCell>
							<TableCell>Giờ bắt đầu</TableCell>
							<TableCell>Giờ kết thúc</TableCell>
							<TableCell>Tình trạng</TableCell>
							<TableCell align="center">Hành động</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedSlots.map((slot) => (
							<TableRow key={slot.id}>
								<TableCell>
									{slot.venue?.name || "N/A"}
								</TableCell>
								<TableCell>
									{slot.sport?.name || "N/A"}
								</TableCell>
								<TableCell>{slot.level || "-"}</TableCell>
								<TableCell>{slot.date}</TableCell>
								<TableCell>{slot.startTime}</TableCell>
								<TableCell>{slot.endTime}</TableCell>
								<TableCell>
									<span
										className={`px-3 py-1 rounded-full text-sm font-medium ${
											slot.isAvailable
												? "bg-green-100 text-green-700"
												: "bg-gray-200 text-gray-700"
										}`}
									>
										{slot.isAvailable
											? "Còn trống"
											: "Đã đặt"}
									</span>
								</TableCell>
								<TableCell align="center">
									<div className="flex gap-2 justify-center">
										<IconButton
											color="secondary"
											size="small"
											onClick={() =>
												handleOpenDialog(slot)
											}
										>
											<Edit />
										</IconButton>
										<IconButton
											color="error"
											size="small"
											onClick={() =>
												handleDelete(slot.id)
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

			{/* 📄 Pagination */}
			<div className="sticky bottom-0 left-0 right-0 py-3 z-10">
				<Stack spacing={2} alignItems="center">
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						color="primary"
					/>
				</Stack>
			</div>

			{/* 🧩 Modal chỉnh sửa slot */}
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				fullWidth
				maxWidth="sm"
			>
				<DialogTitle>Chỉnh sửa Slot</DialogTitle>
				<DialogContent className="flex flex-col gap-3 pt-2">
					<TextField
						fullWidth
						label="ID Sân (venueId)"
						name="venueId"
						type="number"
						value={formData.venueId}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						fullWidth
						label="ID Môn thể thao (sportId)"
						name="sportId"
						type="number"
						value={formData.sportId}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						fullWidth
						label="Trình độ"
						name="level"
						value={formData.level}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						type="date"
						label="Ngày"
						name="date"
						value={formData.date}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						fullWidth
						type="time"
						label="Giờ bắt đầu"
						name="startTime"
						value={formData.startTime}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						fullWidth
						type="time"
						label="Giờ kết thúc"
						name="endTime"
						value={formData.endTime}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						fullWidth
						select
						label="Trạng thái"
						name="isAvailable"
						value={formData.isAvailable ? "true" : "false"}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								isAvailable: e.target.value === "true",
							}))
						}
					>
						<MenuItem value="true">Còn trống</MenuItem>
						<MenuItem value="false">Đã đặt</MenuItem>
					</TextField>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleCloseDialog}>Hủy</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						Lưu thay đổi
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SlotManagement;
	