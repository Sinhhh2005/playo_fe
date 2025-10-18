// src/pages/user/FieldDetail.tsx
import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import { getFieldById, getAllFields } from "../../../services/fieldService";
import type { Field } from "../../../types/field";

export default function FieldDetail() {
  const { id } = useParams<{ id: string }>();
  const [field, setField] = useState<Field | null>(null);
  const [similarFields, setSimilarFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        // ✅ Lấy chi tiết sân
        const fieldData = await getFieldById(id);
        setField(fieldData);

        // ✅ Lấy danh sách sân tương tự
        const allFields = await getAllFields();
        const filtered = allFields.filter((f: Field) => f._id !== id).slice(0, 3);
        setSimilarFields(filtered);
      } catch (err) {
        console.error("Lỗi khi fetch field detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!field) return <div className="p-6">Field not found</div>;

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* FIELD DETAIL */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{field.name}</h2>
                <p className="text-gray-500">{field.name}</p>
              </div>
              {field.image && (
                <img
                  src={field.image}
                  alt={field.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
            </div>

            <div className="mt-4 space-y-3 text-gray-700">
              <p className="flex items-center">
                <FaCalendarAlt className="mr-2 text-green-600" />
                Available everyday
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-green-600" />
                {field.address}
              </p>
            </div>

            <button className="mt-4 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 flex items-center gap-2">
              Show In Map
            </button>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-gray-700">
              {field.type && (
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100">
                  {field.type}
                </span>
              )}
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                {field.pricePerHour ? `${field.pricePerHour} /hr` : `${field.price} đ`}
              </span>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  field.status === "OPEN"
                    ? "bg-green-200 text-green-800"
                    : field.status === "BOOKED"
                    ? "bg-yellow-200 text-yellow-800"
                    : field.status === "LIMITED"
                    ? "bg-orange-200 text-orange-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {field.status}
              </span>
            </div>
          </div>

          {/* TABS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex gap-6 border-b mb-4 text-sm">
              <button className="pb-2 border-b-2 border-green-600 font-medium">
                Game Instructions
              </button>
              <button className="pb-2 text-gray-500 hover:text-gray-800">
                Queries (0)
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {field.description || "No instructions available."}
            </p>
          </div>

          {/* SIMILAR FIELDS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Similar Games</h3>
              <Link to="/play" className="text-green-600 text-sm">
                SEE ALL GAMES →
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarFields.map((sim) => (
                <Link key={sim._id} to={`/fields/${sim._id}`}>
                  <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                    <p className="text-xs text-gray-500">{sim.type}</p>
                    <p className="text-sm font-medium mt-1">
                      {sim.pricePerHour ? `${sim.pricePerHour} /hr` : `${sim.price} đ`}
                    </p>
                    <p className="text-xs text-gray-500">{sim.name}</p>
                    <p className="text-xs mt-2">{sim.address}</p>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                      {sim.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* Players */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-3">Players (1)</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/100?img=8"
                  alt="host"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p>Host</p>
                  <p className="text-xs text-gray-500">Owner</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Nearby Venues */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-3">Venues Nearby</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {similarFields.slice(0, 3).map((v) => (
                <li key={v._id} className="flex items-center gap-3">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p>{v.name}</p>
                    <p className="text-xs text-gray-500">{v.address}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 border border-gray-300 px-4 py-2 rounded-lg text-sm w-full hover:bg-gray-100">
              SEE ALL VENUES
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
