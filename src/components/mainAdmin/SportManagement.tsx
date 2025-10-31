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
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	IconButton,
	Stack,
	Pagination,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import {
	getAllSports,
	createSport,
	updateSport,
	deleteSport,
} from "../../services/sportService";
import type { Sport } from "../../types";

const SportManagement: React.FC = () => {
	const [sports, setSports] = useState<Sport[]>([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [editingSport, setEditingSport] = useState<Sport | null>(null);
	const [formData, setFormData] = useState<Omit<Sport, "id">>({
		name: "",
		description: "",
		imgUrl: "",
		iconUrl: "",
	});

	// Pagination
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 5;

	// 🧠 Fetch dữ liệu
	const fetchSports = async (page: number) => {
		try {
			const res = await getAllSports(page, limit);
			setSports(res.data || []);
			setTotalPages(res.pagination?.totalPages || 1);
		} catch (err) {
			console.error("Lỗi tải danh sách sports:", err);
			toast.error("❌ Không thể tải danh sách sports");
		}
	};

	useEffect(() => {
		fetchSports(page);
	}, [page]);

	// 🧩 Mở dialog thêm/sửa
	const handleOpenDialog = (sport?: Sport) => {
		if (sport) {
			setEditingSport(sport);
			setFormData({
				name: sport.name || "",
				description: sport.description || "",
				imgUrl: sport.imgUrl || "",
				iconUrl: sport.iconUrl || "",
			});
		} else {
			setEditingSport(null);
			setFormData({
				name: "",
				description: "",
				imgUrl: "",
				iconUrl: "",
			});
		}
		setOpenDialog(true);
	};

	const handleCloseDialog = () => setOpenDialog(false);

	// 🧠 Thay đổi input
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// ✅ Thêm hoặc cập nhật sport
	const handleSubmit = async () => {
		if (!formData.name.trim()) {
			toast.error("⚠️ Tên thể thao không được để trống");
			return;
		}

		try {
			if (editingSport) {
				await updateSport(Number(editingSport.id), formData);
				toast.success("✏️ Cập nhật thể thao thành công!");
			} else {
				await createSport(formData);
				toast.success("✅ Thêm thể thao mới thành công!");
			}
			handleCloseDialog();
			fetchSports(page);
		} catch (err) {
			console.error("Lỗi khi lưu:", err);
			toast.error("❌ Không thể lưu thể thao");
		}
	};

	// ❌ Xóa sport
	const handleDelete = async (id: number) => {
		if (!window.confirm("Bạn có chắc muốn xóa loại thể thao này không?"))
			return;
		try {
			await deleteSport(id);
			toast.success("🗑️ Xóa thể thao thành công");
			fetchSports(page);
		} catch (err) {
			console.error("Lỗi khi xóa:", err);
			toast.error("❌ Không thể xóa thể thao");
		}
	};

	// 🧭 Phân trang
	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) =>
		setPage(value);

	return (
		<div className="flex flex-col flex-1 h-full p-4">
			<Toaster position="top-right" />
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">
					⚽ Quản lý loại thể thao
				</h2>
				<Button
					variant="contained"
					color="primary"
					startIcon={<Add />}
					onClick={() => handleOpenDialog()}
				>
					Thêm thể thao
				</Button>
			</div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead className="bg-gray-100">
						<TableRow>
							<TableCell>Tên thể thao</TableCell>
							<TableCell>Mô tả</TableCell>
							<TableCell>Ảnh minh họa</TableCell>
							<TableCell>Biểu tượng</TableCell>
							<TableCell align="center">Hành động</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</TableContainer>

			{/* Bảng danh sách */}
			<div className="flex-1 overflow-y-auto">
				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							{sports.length > 0 ? (
								sports.map((sport) => (
									<TableRow key={sport.id}>
										<TableCell>{sport.name}</TableCell>
										<TableCell>
											{sport.description}
										</TableCell>
										<TableCell>
											{sport.imgUrl ? (
												<img
													src={sport.imgUrl}
													alt={sport.name}
													className="w-12 h-12 object-cover rounded"
												/>
											) : (
												"N/A"
											)}
										</TableCell>
										<TableCell>
											{sport.iconUrl ? (
												<img
													src={sport.iconUrl}
													alt="icon"
													className="w-8 h-8 object-contain"
												/>
											) : (
												"N/A"
											)}
										</TableCell>
										<TableCell align="center">
											<IconButton
												color="secondary"
												size="small"
												onClick={() =>
													handleOpenDialog(sport)
												}
											>
												<Edit />
											</IconButton>
											<IconButton
												color="error"
												size="small"
												onClick={() =>
													handleDelete(
														Number(sport.id)
													)
												}
											>
												<Delete />
											</IconButton>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={5} align="center">
										Không có dữ liệu
									</TableCell>
								</TableRow>
							)}
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

			{/* Modal Thêm / Sửa */}
			<Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
				<DialogTitle>
					{editingSport
						? "✏️ Chỉnh sửa thể thao"
						: "➕ Thêm thể thao mới"}
				</DialogTitle>
				<DialogContent className="flex flex-col gap-3 mt-2">
					<TextField
						fullWidth
						label="Tên thể thao"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Mô tả"
						name="description"
						value={formData.description}
						onChange={handleChange}
						multiline
						rows={2}
					/>
					<TextField
						fullWidth
						label="Ảnh minh họa (imgUrl)"
						name="imgUrl"
						value={formData.imgUrl}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Biểu tượng (iconUrl)"
						name="iconUrl"
						value={formData.iconUrl}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Hủy</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						Lưu
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SportManagement;
