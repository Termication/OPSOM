"use server";

import { getData } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function deleteSummary(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const sql = await getData();
  await sql`DELETE FROM pdf_summaries WHERE id = ${id} AND user_id = ${userId}`;
  revalidatePath("/summaries");
}
