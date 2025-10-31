// src/pages/checkout/CheckoutPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Banknote, Truck, CheckCircle, Loader2, X } from "lucide-react";
import * as BookingService from "../../../../services/bookingService";
import type { CreateBookingInput } from "../../../../services/bookingService";

// FE payment method type
type FE_PaymentMethod = "COD" | "BANK";
// BE payment method type
type BE_PaymentMethod = "COD" | "BANK";

// Helper map FE -> BE
const mapPaymentMethodToBE = (method: FE_PaymentMethod | undefined): BE_PaymentMethod => {
  if (!method) throw new Error("Phương thức thanh toán chưa được chọn");
  if (method === "COD") return "COD";
  if (method === "BANK") return "BANK";
  throw new Error("Phương thức thanh toán không hợp lệ");
};

interface BookingData {
  venueId: number;
  slotId: number | null;
  id: string;
  name: string;
  sport: string;
  date: string;        // YYYY-MM-DD
  startTime: string;   // HH:mm:ss
  ticketPrice: number;
  totalPrice: number;
  discount?: number;
}

// Helper format HH:mm
const formatStartTime = (time: string) => time.slice(0, 5);

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingData = state?.bookingData as BookingData | undefined;

  const [paymentMethod, setPaymentMethod] = useState<FE_PaymentMethod>("COD");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Auto redirect if slot booked
  useEffect(() => {
    if (message?.includes("Chuyển về trang đặt sân")) {
      const timer = setTimeout(() => navigate("/book"), 2500);
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Không có dữ liệu đặt sân.</p>
          <button onClick={() => navigate("/book")} className="mt-4 underline text-blue-600">
            Quay lại đặt sân
          </button>
        </div>
      </div>
    );
  }

  const handleConfirmPayment = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // FE type-safe payload
      const payload: CreateBookingInput = {
        venueId: bookingData.venueId,
        slotId: bookingData.slotId!,
        bookingDate: bookingData.date,
        startTime: formatStartTime(bookingData.startTime),
        ticketPrice: bookingData.ticketPrice,
        totalPrice: bookingData.totalPrice,
        paymentMethod,
      };

      // Map sang BE
      const payloadBE = {
        ...payload,
        paymentMethod: mapPaymentMethodToBE(payload.paymentMethod),
      };

      console.log("📦 Payload gửi BE:", payloadBE);

      await BookingService.createBookingWithPayment(payloadBE);

      setSuccess(true);
      setMessage("🎉 Đặt sân và thanh toán thành công!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err: any) {
      console.error("❌ Checkout error:", err);
      if (err?.response?.data?.message === "This time slot is already booked") {
        setMessage("⚠️ Giờ này đã có người đặt. Chuyển về trang đặt sân...");
      } else {
        setMessage(err?.response?.data?.message || err?.message || "Lỗi khi xử lý thanh toán");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200 relative">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Xác nhận thanh toán
        </h1>

        {/* Thông tin đặt sân */}
        <div className="border rounded-lg p-4 mb-6 bg-gray-50">
          <p><strong>Sân:</strong> {bookingData.name}</p>
          <p><strong>Môn thể thao:</strong> {bookingData.sport}</p>
          <p><strong>Ngày:</strong> {bookingData.date}</p>
          <p><strong>Giờ bắt đầu:</strong> {formatStartTime(bookingData.startTime)}</p>
          {bookingData.discount && (
            <p className="text-green-600">
              Giảm giá: -{bookingData.discount.toLocaleString()}đ
            </p>
          )}
          <p className="font-semibold mt-2">
            Tổng thanh toán: {bookingData.totalPrice.toLocaleString()}đ
          </p>
        </div>

        {/* Chọn phương thức thanh toán */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setPaymentMethod("COD")}
            className={`p-4 rounded-lg border cursor-pointer text-center transition-all ${
              paymentMethod === "COD" ? "border-green-500 bg-green-50" : "border-gray-200"
            }`}
          >
            <Truck className="mx-auto mb-2 text-green-600" />
            <div className="font-medium">Thanh toán khi nhận sân (COD)</div>
          </div>

          <div
            onClick={() => setPaymentMethod("BANK")}
            className={`p-4 rounded-lg border cursor-pointer text-center transition-all ${
              paymentMethod === "BANK" ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
          >
            <Banknote className="mx-auto mb-2 text-blue-600" />
            <div className="font-medium">Chuyển khoản ngân hàng</div>
          </div>
        </div>

        {paymentMethod === "BANK" && (
          <div className="mt-4 p-4 border rounded bg-gray-50 text-sm text-gray-700">
            <p className="font-semibold mb-1">Thông tin chuyển khoản</p>
            <p>Ngân hàng: Vietcombank</p>
            <p>Số TK: 0123456789</p>
            <p>Chủ TK: CÔNG TY TNHH PLAYO</p>
            <p className="mt-1 text-xs text-gray-500">Ghi chú: Họ tên + mã đặt sân</p>
          </div>
        )}

        <button
          onClick={handleConfirmPayment}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 transition-colors"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" /> Đang xử lý...
            </span>
          ) : (
            "Xác nhận thanh toán"
          )}
        </button>

        {/* Banner thông báo */}
        {message && (
          <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-3 rounded shadow-lg font-medium z-50 ${
            success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          } flex items-center gap-2`}>
            {!success && <X className="w-5 h-5" />}
            {success && <CheckCircle className="w-5 h-5" />}
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
