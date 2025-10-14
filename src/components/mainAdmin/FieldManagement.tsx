// FieldRequestTable.tsx
import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Chip,
} from "@mui/material";
import type { FieldRequest } from "../types/field";

interface FieldManagementProps {
	requests: FieldRequest[];
}

const FieldManagement: React.FC<FieldManagementProps> = ({ requests }) => {
	const [data, setData] = useState<FieldRequest[]>(requests);
	const handleApprove = (id: number) => {
		setData((prev) =>
			prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
		);
	};

	const handleReject = (id: number) => {
		setData((prev) =>
			prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
		);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Approved":
				return "success";
			case "Rejected":
				return "error";
			case "Pending":
				return "warning";
			default:
				return "default";
		}
	};

	return (
		<TableContainer component={Paper} className="shadow-lg">
			<Table>
				<TableHead className="bg-gray-100">
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Address</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((req) => (
						<TableRow key={req.id} className="hover:bg-gray-50">
							<TableCell>{req.id}</TableCell>
							<TableCell>{req.name}</TableCell>
							<TableCell>{req.address}</TableCell>
							<TableCell>{req.type}</TableCell>
							<TableCell>
								<Chip
									label={req.status}
									color={getStatusColor(req.status)}
								/>
							</TableCell>
							<TableCell className="space-x-2">
								{req.status === "Pending" && (
									<>
										<button
											className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
											onClick={() =>
												handleApprove?.(req.id)
											}
										>
											Approve
										</button>
										<button
											className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
											onClick={() =>
												handleReject?.(req.id)
											}
										>
											Reject
										</button>
									</>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default FieldManagement;
