import { useState, useEffect } from "react";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // 🔹 Lấy dữ liệu user đã đăng ký từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saved:", formData);

    // 🔹 Update lại user trong localStorage
    localStorage.setItem("user", JSON.stringify(formData));
    alert("Profile updated successfully!");
  };

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
