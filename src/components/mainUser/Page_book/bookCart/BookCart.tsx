import NavbarBook from "../NavbarBook";
import SportBookingSystem from "./SportBookingSystem";

const BookCart = () => {
	return (
		<div>
			<NavbarBook />
			<div className="w-[1300px] flex gap-8 mx-auto my-24">
				{/* Left Side - Booking Details */}
				<div className="flex-1 ">
					<SportBookingSystem />
				</div>

				{/* Right Side - Cart (Placeholder) */}
				<div className="flex-1">
					<div className="p-6 bg-white rounded-lg border border-gray-200">
						<h2 className="text-2xl font-bold text-gray-900 mb-4 flex justify-center">
							Cart
						</h2>
						<div className="text-center py-12 text-gray-500">
							Your cart is empty
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookCart;
