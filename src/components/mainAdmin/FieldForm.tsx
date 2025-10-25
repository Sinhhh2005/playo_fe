import React, { useState, useEffect } from "react";
import type { Field } from "../../types/field";

interface FieldFormProps {
  field: Field;
  onSubmit: (updatedData: Partial<Field>) => void;
  onClose: () => void;
}

const FieldForm: React.FC<FieldFormProps> = ({ field, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<Partial<Field>>({});

  useEffect(() => {
    setFormData(field);
  }, [field]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          ✏️ Chỉnh sửa thông tin sân
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên sân */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Tên sân</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Loại sân */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Loại sân</label>
            <select
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Chọn loại sân --</option>
              <option value="Football">Bóng đá</option>
              <option value="Badminton">Cầu lông</option>
              <option value="Tennis">Tennis</option>
              <option value="Basketball">Bóng rổ</option>
            </select>
          </div>

          {/* Giá */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Giá (VNĐ)</label>
            <input
              type="number"
              name="price"
              value={formData.price ?? ""}
              onChange={handleChange}
              min={0}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Người liên hệ */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Người liên hệ</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Mô tả</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldForm;
