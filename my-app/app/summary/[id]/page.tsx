import { getData } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

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
      {/* Navigation */}
      <div className="mb-6">
        <Link href="/summaries" className="text-blue-600 hover:text-blue-800 transition-colors">
          ← Back to summaries
        </Link>
      </div>

      {/* Summary Info */}
      <h1 className="text-2xl font-bold mb-2">{summary.file_name}</h1>
      <p className="text-gray-600 mb-4">
        Uploaded on: {new Date(summary.created_at).toLocaleString()}
      </p>

      {/* Render Markdown */}
        <div className="prose prose-slate max-w-none bg-white p-6 rounded-xl shadow-lg leading-relaxed space-y-4">
            <ReactMarkdown>{summary.summary_text}</ReactMarkdown>
        </div>
    </section>
  );
}
