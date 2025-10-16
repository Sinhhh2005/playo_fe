import { useState, useEffect } from "react";
import axios from "axios";

const EditProfileForm = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      const storedEmail = localStorage.getItem("email");
      const storedName = localStorage.getItem("userName");

      // Nếu chưa có token → lấy dữ liệu từ localStorage
      if (!token) {
        setFormData({
          firstName: storedName || "",
          lastName: "",
          phone: "",
          email: storedEmail || "",
        });
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.user) {
          const user = res.data.user;
          setFormData({
            firstName: user.firstName || user.name || "",
            lastName: user.lastName || "",
            phone: user.phone || "",
            email: user.email || storedEmail || "",
          });
        } else {
          // fallback localStorage nếu BE chưa có dữ liệu
          setFormData({
            firstName: storedName || "",
            lastName: "",
            phone: "",
            email: storedEmail || "",
          });
        }
      } catch (err) {
        console.error("❌ Lỗi lấy thông tin user:", err);
        setFormData({
          firstName: storedName || "",
          lastName: "",
          phone: "",
          email: storedEmail || "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_URL]);

  // 🔹 Khi nhập liệu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Reset lại form về dữ liệu gốc
  const handleReset = () => {
    window.location.reload(); // reset nhanh nhất, load lại từ BE/localStorage
  };

  // 🔹 Lưu lại thông tin (gửi lên BE hoặc lưu localStorage)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      localStorage.setItem("user", JSON.stringify(formData));
      alert("✅ Profile updated locally!");
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/users/me`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("✅ Profile updated successfully!");
      }
    } catch (err) {
      console.error("❌ Lỗi cập nhật user:", err);
      alert("⚠️ Cập nhật thất bại!");
    }
  };

  if (loading) return <p className="text-center py-6">Loading profile...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-white shadow rounded-lg p-8"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Avatar</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Name"
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone No.
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone No."
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="mt-1 w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-600"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-8 space-x-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-5 py-2 border rounded-md hover:bg-gray-100"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
