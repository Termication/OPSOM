import { auth } from "@clerk/nextjs/server";
import { getData } from "@/lib/db";
import { notFound } from "next/navigation";
import BgGradient from "@/components/common/bg-gradient";
import Link from "next/link";

export default async function ViewSummariesPage() {
  const { userId } = await auth();
  if (!userId) return notFound();

  const sql = await getData();
  const summaries = await sql`
    SELECT id, file_name, created_at 
    FROM pdf_summaries 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC;
  `;

  return (
    <section className="relative min-h-screen px-4 pt-20">
      <BgGradient />

      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold">Past Summaries</h1>
        <p className="text-gray-600">Click on a summary to view more details.</p>
      </div>

      <div className="grid gap-6 mt-10 max-w-4xl mx-auto grid-cols-1 sm:grid-cols-2">
        {summaries.length === 0 ? (
          <p className="text-center text-gray-500 col-span-2">No summaries found.</p>
        ) : (
          summaries.map((summary: any) => (
            <Link
              key={summary.id}
              href={`/summary/${summary.id}`}
              className="transform transition duration-500 hover:scale-105"
            >
              <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-[1px] rounded-2xl shadow-lg">
                <div className="bg-white dark:bg-black rounded-2xl p-6 h-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {summary.file_name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Created at: {new Date(summary.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}