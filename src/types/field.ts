export interface FieldRequest {
  id: number;
  name: string;
  address: string;
  type: string;
  status: "Pending" | "Approved" | "Rejected";
}