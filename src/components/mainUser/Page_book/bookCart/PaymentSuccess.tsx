import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate("/"); // quay lại trang chủ sau 5 giây
		}, 5000);
		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center">
			<CheckCircle className="text-green-500" size={80} />
			<h1 className="text-3xl font-bold text-green-700 mt-4">
				Thanh toán thành công!
			</h1>
			<p className="text-gray-600 mt-2">
				Cảm ơn bạn đã thanh toán. Bạn sẽ được chuyển về trang chủ trong
				giây lát...
			</p>
			<button
				onClick={() => navigate("/")}
				className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
			>
				Quay lại trang chủ
			</button>
		</div>
	);
};

export default PaymentSuccess;
