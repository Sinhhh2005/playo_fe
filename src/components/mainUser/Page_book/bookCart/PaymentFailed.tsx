import { XCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // quay lại trang chủ sau 5 giây
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center">
      <XCircle className="text-red-500" size={80} />
      <h1 className="text-3xl font-bold text-red-700 mt-4">
        Thanh toán thất bại
      </h1>
      <p className="text-gray-600 mt-2">
        Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc chọn phương thức khác.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
      >
        Quay lại trang chủ
      </button>
    </div>
  );
};

export default PaymentFailed;
