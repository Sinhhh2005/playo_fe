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
} from "@mui/material";
import { Visibility, Edit, Block } from "@mui/icons-material";
import type { User } from "../types/user";

// 2. Định nghĩa type cho props
interface UserTableProps {
	users: User[];
}

const UserManagement: React.FC<UserTableProps> = ({ users }) => {
	return (
		<div className="p-4">
			<TableContainer component={Paper} className="shadow-md rounded-lg">
				<Table>
					{/* Header */}
					<TableHead className="bg-gray-100">
						<TableRow>
							<TableCell className="font-bold">ID</TableCell>
							<TableCell className="font-bold">Tên</TableCell>
							<TableCell className="font-bold">Email</TableCell>
							<TableCell className="font-bold">Role</TableCell>
							<TableCell className="font-bold">
								Trạng thái
							</TableCell>
							<TableCell className="font-bold">Action</TableCell>
						</TableRow>
					</TableHead>

					{/* Body */}
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id} hover>
								<TableCell>{user.id}</TableCell>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									<Chip
										label={user.role}
										color={
											user.role === "admin"
												? "primary"
												: "secondary"
										}
										size="small"
									/>
								</TableCell>
								<TableCell>
									<Chip
										label={user.status}
										color={
											user.status === "active"
												? "success"
												: user.status === "inactive"
												? "warning"
												: "error"
										}
										size="small"
									/>
								</TableCell>
								<TableCell>
									<div className="flex gap-2">
										<IconButton
											color="primary"
											size="small"
										>
											<Visibility />
										</IconButton>
										<IconButton
											color="secondary"
											size="small"
										>
											<Edit />
										</IconButton>
										<IconButton color="error" size="small">
											<Block />
										</IconButton>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default UserManagement;
