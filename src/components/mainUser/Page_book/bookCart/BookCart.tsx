// src/components/mainUser/Page_book/BookCart.tsx
import NavbarBook from "../NavbarBook";
import SportBookingSystem from "./SportBookingSystem";

const BookCart = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <NavbarBook />

      {/* Main Content */}
      <div className="max-w-[1300px] flex flex-col lg:flex-row gap-8 mx-auto my-24 px-4">
        {/* Left Side - Booking Details */}
        <div className="flex-1">
          <SportBookingSystem />
        </div>

        {/* Right Side - Cart */}
        <div className="flex-1">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
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
