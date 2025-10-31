import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/authService";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		if (!name || !email || !password) {
			setError("Vui lòng nhập đầy đủ thông tin bắt buộc");
			return;
		}

		try {
			setLoading(true);

			const response = await register({ name, email, password, phone });

			if (response.success) {
				alert("🎉 Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
				navigate("/login");
			} else {
				setError(
					response.message || "Đăng ký thất bại. Vui lòng thử lại."
				);
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error("Register error:", err);
				setError(
					err.message ||
						"Đã xảy ra lỗi không xác định. Vui lòng thử lại."
				);
			} else {
				console.error("Register error:", err);
				setError("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
				<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Register
				</h2>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Full Name"
						className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="email"
						placeholder="Email"
						className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="tel"
						placeholder="Phone (optional)"
						className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
					>
						{loading ? "Đang đăng ký..." : "Register"}
					</button>
				</form>

				<p className="text-center text-sm text-gray-600 mt-4">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-600 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
