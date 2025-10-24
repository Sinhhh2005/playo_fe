import React, { useEffect, useState, useMemo } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Services from "../../../services";

const GAMES_PER_PAGE = 6;

const GamesList: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(GAMES_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🧠 Bộ lọc
  const [filters, setFilters] = useState({
    sport: "all",
    district: "all",
    price: "all",
    status: "all",
  });

  // 🟢 Fetch song song Fields + Users + Categories từ BE
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fieldsRes, usersRes, categoriesRes] = await Promise.all([
          Services.FieldService.getAllFields(),
          Services.UserService.getAllUsers(),
          Services.CategoryService.getAllCategories(),
        ]);

        const fieldsData = Array.isArray(fieldsRes)
          ? fieldsRes
          : fieldsRes?.data || [];

        const usersData = Array.isArray(usersRes)
          ? usersRes
          : usersRes?.data || [];

        const categoryData = Array.isArray(categoriesRes?.data)
          ? categoriesRes.data
          : [];

        setGames(fieldsData);
        setUsers(usersData);
        setCategories(categoryData);
      } catch (err: any) {
        console.error("❌ Lỗi khi fetch dữ liệu:", err);
        setError(err?.message || "Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getOwnerInfo = (ownerId: number) => {
    if (!Array.isArray(users)) return null;
    const owner = users.find((u: any) => u.id === ownerId);
    return owner || null;
  };

  // 🧮 Lọc dữ liệu
  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      const matchSport =
        filters.sport === "all" ||
        g.sportId?.toString() === filters.sport ||
        g.sportName?.toLowerCase() ===
          categories.find((c) => c.id.toString() === filters.sport)?.name?.toLowerCase();

      const matchDistrict =
        filters.district === "all" || g.district === filters.district;

      const matchStatus =
        filters.status === "all" || g.status === filters.status;

      let matchPrice = true;
      if (filters.price !== "all") {
        const price = Number(g.pricePerHour || 0);
        switch (filters.price) {
          case "low":
            matchPrice = price < 100000;
            break;
          case "medium":
            matchPrice = price >= 100000 && price < 200000;
            break;
          case "high":
            matchPrice = price >= 200000;
            break;
        }
      }

      return matchSport && matchDistrict && matchPrice && matchStatus;
    });
  }, [games, filters, categories]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + GAMES_PER_PAGE);

  if (loading) return <div className="p-6 text-center">Đang tải...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!games.length)
    return <div className="p-6 text-center text-gray-500">Chưa có sân nào</div>;

  // 🔍 Lấy danh sách duy nhất cho dropdown
  const districtOptions = Array.from(new Set(games.map((g) => g.district)));

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Danh sách sân đang hoạt động
        </h1>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Sport (Category từ API) */}
        <select
          value={filters.sport}
          onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
          className="border rounded-full px-4 py-2 text-sm"
        >
          <option value="all">Tất cả môn thể thao</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          value={filters.district}
          onChange={(e) => setFilters({ ...filters, district: e.target.value })}
          className="border rounded-full px-4 py-2 text-sm"
        >
          <option value="all">Tất cả khu vực</option>
          {districtOptions.map(
            (d) =>
              d && (
                <option key={d} value={d}>
                  {d}
                </option>
              )
          )}
        </select>

        {/* Price */}
        <select
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          className="border rounded-full px-4 py-2 text-sm"
        >
          <option value="all">Tất cả giá</option>
          <option value="low">Dưới 100.000₫</option>
          <option value="medium">100.000₫ - 200.000₫</option>
          <option value="high">Trên 200.000₫</option>
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border rounded-full px-4 py-2 text-sm"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Ngưng hoạt động</option>
        </select>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredGames.slice(0, visibleCount).map((g) => {
          const owner = getOwnerInfo(g.ownerId);
          const avatar = owner?.avatar || "/default-avatar.png";
          const name = owner?.username || owner?.name || "Chủ sân";

          const sportLabel =
            categories.find((c) => c.id === g.sportId)?.name ||
            g.sportName ||
            "Môn thể thao";

          return (
            <Link
              key={g.id}
              to={`/play/${g.id}`}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md p-4 block transition"
            >
              <p className="text-sm text-gray-500 mb-2">{sportLabel}</p>

              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-sm font-semibold text-gray-800">{name}</p>
                </div>

                {g.stock && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center">
                    🎾 {g.stock} Slots
                  </span>
                )}
              </div>

              <p className="text-gray-700 text-sm mb-2">
                {g.name} ({g.district})
              </p>

              <p className="flex items-center text-gray-600 text-sm mt-1">
                <FaMapMarkerAlt className="mr-1" />{" "}
                {g.address || "Địa chỉ chưa cập nhật"}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                  {g.status === "active" ? "Đang hoạt động" : "Ngưng"}
                </span>
                <span className="text-sm font-semibold text-green-700">
                  {Number(g.pricePerHour).toLocaleString()}₫/giờ
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load more */}
      {visibleCount < filteredGames.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Không có kết quả */}
      {filteredGames.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Không có sân nào khớp với bộ lọc hiện tại.
        </p>
      )}
    </section>
  );
};

export default GamesList;
