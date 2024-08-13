import { api } from "@/api";

export interface SignUpBody {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: string;
}
export async function useSignUp({
  restaurantName,
  managerName,
  email,
  phone,
}: SignUpBody) {
  await api.post("/restaurants", {
    restaurantName,
    managerName,
    email,
    phone,
  });
}
