import { useState, useEffect } from "react";
import NavbarBook from "../../components/mainUser/Page_book/NavbarBook";
import NavBottom from "../../components/mainUser/Page_book/NavBottom";
import VenuesCard from "../../components/mainUser/Page_book/VenuesCard";
import SportsComplexes from "../../components/mainUser/Page_book/CitiesBook";
import Footer from "../../components/mainUser/Footer";
import { getVenues } from "../../services/bookService";
import type { Field } from "../../types";

const Book = () => {
  const [venues, setVenues] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🧩 Lấy danh sách sân từ backend
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getVenues();
        if (res.success) {
          setVenues(res.data);
        } else {
          setError(res.message);
        }
      } catch (err: any) {
        console.error(err);
        setError("Không thể tải danh sách sân. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div>
      <NavbarBook />
      <NavBottom activeTab="venues" onTabChange={() => {}} />

      <div className="flex flex-col items-center px-24 py-12 gap-[64px] bg-[#f1f3f2]">
        {loading && <p className="text-center">Đang tải danh sách sân...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="w-full max-w-6xl mx-auto">
            <VenuesCard venues={venues} />
          </div>
        )}
      </div>

      <SportsComplexes />
      <Footer />
    </div>
  );
};

export default Book;
