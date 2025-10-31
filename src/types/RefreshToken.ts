export interface RefreshToken {
  id: number;
  token: string;
  expiryDate: string;
  userId: string; // UUID
  createdAt?: string;
  updatedAt?: string;
}
