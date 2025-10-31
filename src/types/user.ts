export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  avatar?: string;
  role: "user" | "owner" | "admin";
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}