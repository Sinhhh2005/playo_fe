export interface User {
  id: string;                        // UUID (primary key)
  name: string;                      // Tên người dùng
  email: string;                     // Email (unique)
  password?: string;                 // Ẩn khi trả về, nhưng để optional
  phone?: string | null;             // Số điện thoại (nullable)
  address?: string | null;           // Địa chỉ (nullable)
  dateOfBirth?: string | null;       // Ngày sinh (YYYY-MM-DD)
  avatar?: string | null;            // URL ảnh đại diện
  role: "user" | "owner" | "admin";  // Vai trò hệ thống
  status?: "active" | "inactive";    // Tùy chọn thêm: trạng thái tài khoản
  
  createdAt?: string;
  updatedAt?: string;
}