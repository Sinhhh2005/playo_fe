import { useState } from "react";
import NavbarBook from "../NavbarBook";
import SportBookingSystem from "./SportBookingSystem";
import { Trash2, Calendar, Clock, DollarSign } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  sport: string;
  date: string;
  startTime: string;
  duration: number;
  court: string;
  price?: string | number;
}

const BookCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ✅ Ép kiểu price thành number khi thêm
  const handleAddToCart = (item: CartItem) => {
    const formattedItem: CartItem = {
      ...item,
      price: Number(item.price) || 0,
    };
    setCartItems([formattedItem]); // chỉ 1 item trong giỏ
  };

  const handleRemove = () => setCartItems([]);

  const total = cartItems.reduce((sum, i) => sum + (Number(i.price) || 0), 0);
  const discount = total * 0.3;
  const finalTotal = total - discount;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarBook />

      <div className="max-w-[1300px] flex flex-col lg:flex-row gap-8 mx-auto my-24 px-4">
        {/* Left - Booking Form */}
        <div className="flex-1">
          <SportBookingSystem
            onAddToCart={handleAddToCart}
            isBooked={cartItems.length > 0}
          />
        </div>

        {/* Right - Cart */}
        <div className="flex-1">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Giỏ hàng ({cartItems.length})
            </h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">Giỏ hàng trống</div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50 mb-4"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{item.court}</h3>
                    <button
                      onClick={() => handleRemove()}
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
                      <Clock size={16} /> {item.startTime} ({item.duration} phút)
                    </div>
                    <div className="flex items-center gap-2 font-medium text-gray-800">
                      <DollarSign size={16} /> {Number(item.price).toLocaleString()}đ
                    </div>
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <>
                <div className="bg-gray-100 text-center py-3 rounded-md text-gray-700 mb-4">
                  🎉 Giảm giá 30%: {discount.toLocaleString()}đ
                </div>
                <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition">
                  Thanh toán {finalTotal.toLocaleString()}đ
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
