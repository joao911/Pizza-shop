import { api } from "@/api";

export interface SignInBody {
  email: string;
}
export async function useLogin({ email }: SignInBody) {
  await api.post("/authenticate", { email });
}
