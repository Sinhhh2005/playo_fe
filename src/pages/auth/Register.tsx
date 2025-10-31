import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/authService";
import { motion } from "framer-motion";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		if (!name || !email || !password || !confirmPassword) {
			setError("Vui lòng nhập đầy đủ thông tin bắt buộc");
			return;
		}

		if (password !== confirmPassword) {
			setError("❌ Mật khẩu xác nhận không khớp");
			return;
		}

		try {
			setLoading(true);
			const response = await register({ name, email, password, phone });

			if (response.success) {
				alert("🎉 Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
				navigate("/login");
			} else {
				setError(response.message || "Đăng ký thất bại. Vui lòng thử lại.");
			}
		} catch (err: unknown) {
			if (err instanceof Error)
				setError(err.message || "Đã xảy ra lỗi không xác định.");
			else setError("Đã xảy ra lỗi không xác định.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
			>
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
					Đăng ký tài khoản
				</h2>

				<form className="space-y-5" onSubmit={handleSubmit}>
					<div>
						<label className="text-gray-600 text-sm font-medium">Họ tên</label>
						<input
							type="text"
							placeholder="Nhập họ tên đầy đủ"
							className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-500 outline-none"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div>
						<label className="text-gray-600 text-sm font-medium">Email</label>
						<input
							type="email"
							placeholder="Nhập email"
							className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-500 outline-none"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div>
						<label className="text-gray-600 text-sm font-medium">
							Số điện thoại
						</label>
						<input
							type="tel"
							placeholder="Nhập số điện thoại (không bắt buộc)"
							className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-500 outline-none"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>

					{/* 🔑 Mật khẩu */}
					<div className="relative">
						<label className="text-gray-600 text-sm font-medium">Mật khẩu</label>
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Nhập mật khẩu"
							className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-500 outline-none pr-10"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 bottom-2 text-gray-500 hover:text-gray-700"
						>
							{showPassword ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-10.8-7.5a10.05 10.05 0 013.165-4.568M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1l11.8 11.8"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							)}
						</button>
					</div>

					{/* 🔁 Xác nhận mật khẩu */}
					<div className="relative">
						<label className="text-gray-600 text-sm font-medium">
							Xác nhận mật khẩu
						</label>
						<input
							type={showConfirm ? "text" : "password"}
							placeholder="Nhập lại mật khẩu"
							className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-500 outline-none pr-10"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<button
							type="button"
							onClick={() => setShowConfirm(!showConfirm)}
							className="absolute right-3 bottom-2 text-gray-500 hover:text-gray-700"
						>
							{showConfirm ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-10.8-7.5a10.05 10.05 0 013.165-4.568M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1l11.8 11.8"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							)}
						</button>
					</div>

					{error && (
						<p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg text-center">
							{error}
						</p>
					)}

					<motion.button
						whileTap={{ scale: 0.95 }}
						type="submit"
						disabled={loading}
						className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
					>
						{loading ? "Đang đăng ký..." : "Đăng ký"}
					</motion.button>
				</form>

				<p className="text-center text-sm text-gray-600 mt-4">
					Đã có tài khoản?{" "}
					<Link to="/login" className="text-green-600 hover:underline">
						Đăng nhập
					</Link>
				</p>
			</motion.div>
		</div>
	);
};

export default Register;
