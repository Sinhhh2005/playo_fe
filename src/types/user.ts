export interface User {
  id: number | string;
  name: string;
  email: string;
  role: "admin" | "field_owner" | "user";
  status: "active" | "inactive" | "banned";
}