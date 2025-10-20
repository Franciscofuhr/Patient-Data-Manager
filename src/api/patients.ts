import { type Patient } from "../types/Patient";
import { BASE_URL } from "../utils/constants";

export async function getPatients(): Promise<Patient[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}
