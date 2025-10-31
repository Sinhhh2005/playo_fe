export interface Cart {
  id: number;
  itemName: string;
  bookingDate: string;
  startTime: string;
  basePrice: number;
  currency: string;
  discountAmount: number;
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
}