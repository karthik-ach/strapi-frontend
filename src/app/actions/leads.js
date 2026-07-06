"use server";

import { apiFetch } from "@/app/services/apiFetch";

export async function submitLead({ name, email, number }) {
  const res = await apiFetch("leads", "POST", { data: { name, email, number } });

  if (!res) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
