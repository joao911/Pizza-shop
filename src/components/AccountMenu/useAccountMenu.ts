import { api } from "@/api";

interface GetProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("/me");
  return response.data;
}

interface GetManagedResponse {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

export async function getManagerRestaurant() {
  const response = await api.get<GetManagedResponse>("/managed-restaurant");
  return response.data;
}
