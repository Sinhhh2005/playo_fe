import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css"; // Tailwind

// ✅ Seed tài khoản admin mặc định vào localStorage
const adminUser = {
	name: "Super Admin",
	email: "admin@gmail.com",
	password: "123456", // bạn đổi mật khẩu nếu muốn
	role: "admin",
	createdAt: new Date().toISOString(),
};

// Lấy danh sách users hiện có
const users = JSON.parse(localStorage.getItem("users") || "[]");

// Nếu chưa có admin thì thêm
const exists = users.find((u: any) => u.email === adminUser.email);
if (!exists) {
	users.push(adminUser);
	localStorage.setItem("users", JSON.stringify(users));
	console.log(
		"✅ Admin account created:",
		adminUser.email,
		adminUser.password
	);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
