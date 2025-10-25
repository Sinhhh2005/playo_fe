import * as React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Chip,
	CircularProgress,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	MenuItem,
} from "@mui/material";
import { Visibility, Edit, Delete, Search } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import type { User } from "../../types";
import {
	createUser,
	deleteUser,
	getAllUsers,
	updateUser,
} from "../../services/userService";

const UserManagement: React.FC = () => {
	const [users, setUsers] = React.useState<User[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	// 🆕 Thêm state cho phân trang
	const [page, setPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);
	const limit = 6;

	// xem chi profile user.
	const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
	const [openDetail, setOpenDetail] = React.useState(false);

	// chỉnh sửa user.
	const [open, setOpen] = React.useState(false);
	const [editingUser, setEditingUser] = React.useState<User | null>(null);
	const [formData, setFormData] = React.useState<Partial<User>>({});

	// Tim kiếm user.
	const [searchTerm, setSearchTerm] = React.useState("");
	const [debouncedSearch, setDebouncedSearch] = React.useState("");

	// xem chi tiết User.
	const handleView = (user: User) => {
		setSelectedUser(user);
		setOpenDetail(true);
	};

	const handleCloseDetail = () => {
		setSelectedUser(null);
		setOpenDetail(false);
	};

	// 🟢 Mở dialog
	const handleOpen = (user?: User) => {
		setEditingUser(user || null);
		setFormData(user ? { ...user } : { role: "user", status: "active" });
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setEditingUser(null);
		setFormData({});
	};

	// 🟢 Xử lý thay đổi input
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// 🟢 Thêm/Sửa user
	const handleSubmit = async () => {
		if (!formData.name || !formData.email) {
			alert("Tên và email là bắt buộc!");
			return;
		}

		if (editingUser) {
			const res = await updateUser(editingUser.id, formData);
			if (res.success && res.data) {
				setUsers((prev) =>
					prev.map((u) => (u.id === editingUser.id ? res.data! : u))
				);
			} else {
				alert(res.message || "Cập nhật người dùng thất bại");
			}
		} else {
			if (!formData.password) {
				alert("Vui lòng nhập mật khẩu khi tạo mới!");
				return;
			}
			const res = await createUser(formData);
			if (res.success && res.data) {
				setUsers((prev) => [...prev, res.data as User]);
			} else {
				alert(res.message || "Không thể tạo người dùng mới");
			}
		}
		handleClose();
	};

	// 🟢 Xóa user
	const handleDelete = async (id: string) => {
		if (!confirm("Bạn có chắc muốn xoá user này?")) return;
		const res = await deleteUser(id);
		if (res.success) {
			setUsers((prev) => prev.filter((u) => u.id !== id));
		} else {
			alert(res.message || "Xoá thất bại");
		}
	};

	// handle search.
	// 🧠 Giữ focus lại cho input mỗi khi debounce search xong

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchTerm);
			setPage(0);
		}, 800);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	// 🟢 Gọi API khi component mount
	React.useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			const result = await getAllUsers(page, limit, debouncedSearch);
			if (result.success && result.data) {
				setUsers(result.data);
				setTotalPages(result.pagination?.totalPages ?? 1);
				setError(null);
			} else {
				setError(
					result.message || "Không thể tải danh sách người dùng"
				);
			}
			setLoading(false);
		};
		fetchUsers();
	}, [page, debouncedSearch]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<CircularProgress />
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-4">
				<Alert severity="error">{error}</Alert>
			</div>
		);
	}

	return (
		<main className="flex flex-col flex-1 h-full relative">
			<div className="flex justify-between items-center my-4">
				<h2 className="text-xl font-semibold">Quản lý người dùng</h2>
				{/* Search */}
				<div className="flex-1 max-w-md mx-6">
					<div className="relative">
						<Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 hover:text-gray-500 cursor-pointer" />
						<input
							type="text"
							value={searchTerm}
							placeholder="Tìm kiếm người dùng..."
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border rounded-lg hover:border-gray-600 "
						/>
					</div>
				</div>
				<Button
					variant="contained"
					color="primary"
					onClick={() => handleOpen()}
				>
					+ Thêm người dùng
				</Button>
			</div>
			<TableContainer component={Paper} className="shadow-md rounded-lg">
				<Table>
					<TableHead className="bg-gray-100">
						<TableRow>
							<TableCell className="font-bold">Avatar</TableCell>
							<TableCell className="font-bold">Tên</TableCell>
							<TableCell className="font-bold">Email</TableCell>
							<TableCell className="font-bold">Vai trò</TableCell>
							<TableCell className="font-bold">
								Hành động
							</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</TableContainer>
			<div className="flex-1 overflow-y-auto">
				<TableContainer
					component={Paper}
					className="shadow-md rounded-lg"
				>
					<Table>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id} hover>
									<TableCell>
										<img
											src={user.avatar || "/png"} // ảnh mặc định nếu không có avatar
											alt={user.name}
											style={{
												width: 40,
												height: 40,
												borderRadius: "50%",
												objectFit: "cover",
												border: "1px solid #ddd",
											}}
										/>
									</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										<Chip
											label={user.role}
											color={
												user.role === "admin"
													? "primary"
													: user.role === "owner"
													? "secondary"
													: "default"
											}
											size="small"
										/>
									</TableCell>

									<TableCell>
										<div className="flex gap-2">
											<IconButton
												color="primary"
												size="small"
												onClick={() => handleView(user)}
											>
												<Visibility />
											</IconButton>
											<IconButton
												color="secondary"
												size="small"
												onClick={() => handleOpen(user)}
											>
												<Edit />
											</IconButton>
											<IconButton
												color="error"
												size="small"
												onClick={() =>
													handleDelete(user.id)
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

				{/* 🟢 Dialog xem chi tiết người dùng */}
				<Dialog
					open={openDetail}
					onClose={handleCloseDetail}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>Thông tin người dùng</DialogTitle>
					<DialogContent className="flex flex-col gap-3 mt-2">
						{selectedUser && (
							<div className="space-y-3">
								<div className="flex justify-center mb-4">
									<img
										src={
											selectedUser.avatar ||
											"/default-avatar.png"
										}
										alt={selectedUser.name}
										style={{
											width: 80,
											height: 80,
											borderRadius: "50%",
											objectFit: "cover",
											border: "2px solid #ccc",
										}}
										onError={(e) =>
											(e.currentTarget.src =
												"/default-avatar.png")
										}
									/>
								</div>
								<p>
									<strong>Tên:</strong> {selectedUser.name}
								</p>
								<p>
									<strong>Email:</strong> {selectedUser.email}
								</p>
								<p>
									<strong>Vai trò:</strong>{" "}
									{selectedUser.role}
								</p>
								<p>
									<strong>Số điện thoại:</strong>{" "}
									{selectedUser.phone || "—"}
								</p>
								<p>
									<strong>Địa chỉ:</strong>{" "}
									{selectedUser.address || "—"}
								</p>
								<p>
									<strong>Ngày sinh:</strong>{" "}
									{selectedUser.dateOfBirth || "—"}
								</p>
								<p>
									<strong>Trạng thái:</strong>{" "}
									<Chip
										label="Hoạt động"
										color="success"
										size="small"
									/>
								</p>
							</div>
						)}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDetail}>Đóng</Button>
					</DialogActions>
				</Dialog>

				{/* 🟢 Dialog thêm/sửa người dùng */}
				<Dialog
					open={open}
					onClose={handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>
						{editingUser
							? "Cập nhật người dùng"
							: "Thêm người dùng mới"}
					</DialogTitle>
					<DialogContent className="flex flex-col gap-3 mt-2">
						<TextField
							label="Tên"
							name="name"
							value={formData.name || ""}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							label="Email"
							name="email"
							value={formData.email || ""}
							onChange={handleChange}
							fullWidth
						/>
						{!editingUser && (
							<TextField
								label="Mật khẩu"
								name="password"
								type="password"
								value={formData.password || ""}
								onChange={handleChange}
								fullWidth
							/>
						)}
						<TextField
							label="Số điện thoại"
							name="phone"
							value={formData.phone || ""}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							label="Địa chỉ"
							name="address"
							value={formData.address || ""}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							label="Ngày sinh"
							name="dateOfBirth"
							type="date"
							value={formData.dateOfBirth || ""}
							onChange={handleChange}
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
						<TextField
							label="Avatar URL"
							name="avatar"
							value={formData.avatar || ""}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							select
							label="Vai trò"
							name="role"
							value={formData.role || "user"}
							onChange={handleChange}
							fullWidth
						>
							<MenuItem value="user">User</MenuItem>
							<MenuItem value="owner">Owner</MenuItem>
							<MenuItem value="admin">Admin</MenuItem>
						</TextField>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Hủy</Button>
						<Button variant="contained" onClick={handleSubmit}>
							{editingUser ? "Lưu" : "Tạo mới"}
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			{/* 🟢 Phân trang cố định phía trên footer */}
			<div className="sticky bottom-0 left-0 right-0  py-3 z-10">
				<Stack spacing={2} alignItems="center">
					<Pagination
						count={totalPages}
						page={page}
						onChange={(_, value) => setPage(value)}
						color="primary"
						size="medium"
					/>
				</Stack>
			</div>
		</main>
	);
};

export default UserManagement;