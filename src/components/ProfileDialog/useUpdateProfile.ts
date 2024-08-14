import { api } from "@/api";
interface UpdateProfileBody {
  name: string;
  description: string;
}
export async function updateProfile({ name, description }: UpdateProfileBody) {
  const response = await api.put("/profile", { name, description });
  return response.data;
}
