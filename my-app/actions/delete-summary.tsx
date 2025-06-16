"use server";

import { getData } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteSummary(id: string, userId: string) {
  const sql = await getData();
  await sql`DELETE FROM pdf_summaries WHERE id = ${id} AND user_id = ${userId}`;
  revalidatePath("/summaries");
}
