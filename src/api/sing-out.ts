import { api } from ".";

export async function singOut() {
  await api.post("/sign-out");
}
