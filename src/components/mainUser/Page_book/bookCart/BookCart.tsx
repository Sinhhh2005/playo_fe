import { useState } from "react";
import NavbarBook from "../NavbarBook";
import SportBookingSystem from "./SportBookingSystem";
import { Trash2, Calendar, Clock, DollarSign } from "lucide-react";
import axiosClient from "../../../../utils/axiosClient";
import type { CartItem } from "../../../../types/cartItem";

const BookCart = () => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [loading, setLoading] = useState(false);

	const handleAddToCart = (item: CartItem) => setCartItems([item]);
	const handleRemove = () => setCartItems([]);

	const discount = cartItems.length
		? Math.round(cartItems[0].ticketPrice * 0.3)
		: 0;
	const finalTotal = cartItems.length
		? cartItems[0].ticketPrice - discount
		: 0;

	const handleStripeCheckout = async () => {
		if (!cartItems.length) return;
		setLoading(true);
		try {
			const item = cartItems[0];
			const bookingRes = await axiosClient.post("/bookings", {
				slotId: item.slotId,
				sportId: item.sportId,
				venueId: item.venueId,
				bookingDate: item.date,
				startTime: item.startTime,
				endTime: item.endTime,
				hourly: Boolean(item.hourly),
				ticketPrice: item.ticketPrice,
				totalPrice: finalTotal,
				status: "pending",
			});

			const bookingId = bookingRes.data.data.id;
			const paymentRes = await axiosClient.post(
				"/payments/create-online",
				{
					bookingId,
				}
			);

			window.location.href = paymentRes.data.data.paymentUrl; // redirect sang Stripe
		} catch (err) {
			console.error("Stripe checkout error:", err);
			alert("Không thể khởi tạo thanh toán Stripe.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<NavbarBook />
			<div className="max-w-[1200px] flex flex-col lg:flex-row gap-8 mx-auto my-16 px-4">
				<div className="flex-1">
					<SportBookingSystem
						onAddToCart={handleAddToCart}
						isBooked={cartItems.length > 0}
					/>
				</div>

				<div className="flex-1">
					<div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
						<h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
							Giỏ hàng ({cartItems.length})
						</h2>

						{cartItems.length === 0 ? (
							<div className="text-center py-12 text-gray-500">
								Giỏ hàng trống
							</div>
						) : (
							cartItems.map((item) => (
								<div
									key={item.id}
									className="border rounded-lg p-4 shadow-sm bg-gray-50 mb-4"
								>
									<div className="flex justify-between items-start">
										<h3 className="font-semibold text-gray-800">
											{item.name}
										</h3>
										<button
											onClick={handleRemove}
											className="text-red-500 hover:text-red-700"
										>
											<Trash2 size={20} />
										</button>
									</div>
									<div className="mt-2 text-sm text-gray-600 space-y-1">
										<div className="flex items-center gap-2">
											<Calendar size={16} /> {item.date}
										</div>
										<div className="flex items-center gap-2">
											<Clock size={16} /> {item.startTime}{" "}
											({item.duration} phút)
										</div>
										<div className="flex items-center gap-2 font-medium text-gray-800">
											<DollarSign size={16} />{" "}
											{item.ticketPrice.toLocaleString()}đ
										</div>
									</div>
								</div>
							))
						)}

						{cartItems.length > 0 && (
							<>
								<div className="bg-gray-100 text-center py-3 rounded-md text-gray-700 mb-4">
									🎉 Giảm giá 30%: {discount.toLocaleString()}
									đ
								</div>

								<button
									onClick={handleStripeCheckout}
									disabled={loading}
									className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
								>
									{loading
										? "Đang khởi tạo..."
										: "Thanh toán"}
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookCart;
