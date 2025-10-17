import { useState, useEffect } from "react";
import { getUserById, updateUser } from "../../../services/userService";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const storedEmail = localStorage.getItem("email") || "";

      if (!storedUser?.id) {
        console.warn("⚠️ Không tìm thấy user trong localStorage");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: storedEmail,
        });
        setLoading(false);
        return;
      }

      // 🟢 Gọi service lấy user theo ID
      const res = await getUserById(storedUser.id);
      if (res.success && res.data) {
        const user = res.data;
        const nameParts = user.name ? user.name.split(" ") : ["", ""];
        setFormData({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          phone: user.phone || "",
          email: user.email || storedEmail,
        });
      } else {
        console.error("❌ Lỗi lấy thông tin user:", res.message);
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: storedEmail,
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  // 🟡 Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔁 Reset form
  const handleReset = () => {
    window.location.reload();
  };

  // 🟢 Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!storedUser?.id) {
      alert("⚠️ Không tìm thấy user!");
      return;
    }

    const updatedData = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: formData.phone,
    };

    const res = await updateUser(storedUser.id, updatedData);

    if (res.success) {
      alert("✅ Cập nhật hồ sơ thành công!");
    } else {
      alert(`⚠️ Lỗi: ${res.message}`);
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
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
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
