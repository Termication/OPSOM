// app/summary/[id]/page.tsx
import { getData } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

export default async function SummaryDetailPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return notFound();

  const sql = await getData();
  const [summary] = await sql`
    SELECT * FROM pdf_summaries WHERE id = ${params.id} AND user_id = ${userId};
  `;

  if (!summary) return notFound();

  return (
    <section className="min-h-screen px-4 pt-20 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{summary.file_name}</h1>
      <p className="text-gray-600 mb-2">Uploaded on: {new Date(summary.created_at).toLocaleString()}</p>
      <div className="mt-6 p-4 bg-white shadow-md rounded-lg border">
        <h2 className="font-semibold text-lg mb-2">Summary:</h2>
        <p className="whitespace-pre-line">{summary.summary_text}</p>
      </div>
    </section>
  );
}
