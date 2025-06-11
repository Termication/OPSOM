import { auth } from "@clerk/nextjs/server";
import { getData } from "@/lib/db";
import { notFound } from "next/navigation";
import BgGradient from "@/components/common/bg-gradient";
import Link from "next/link";
import { revalidatePath } from "next/cache";

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


  async function handleDelete(id: string) {
    "use server";
    const sql = await getData();
    await sql`DELETE FROM pdf_summaries WHERE id = ${id} AND user_id = ${userId}`;
    revalidatePath("/summaries");
  }


  
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
            <div
              key={summary.id}
              className="group relative transform transition duration-300 hover:scale-[1.03] focus:outline-none rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg group-focus:shadow-lg transition-all duration-300 ring-1 ring-transparent group-focus:ring-indigo-500"
            >
              <Link href={`/summary/${summary.id}`} className="block">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-pink-500 to-yellow-500 opacity-60 group-hover:opacity-80 transition-opacity duration-500 blur-sm" />
                <div className="relative z-10 bg-white dark:bg-zinc-900 rounded-2xl p-6 h-full transition-colors duration-300 group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-indigo-500">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {summary.file_name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Created at: {new Date(summary.created_at).toLocaleString()}
                  </p>
                </div>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await handleDelete(summary.id);
                }}
                className="absolute top-2 right-2 z-20"
              >
                <button
                  type="submit"
                  className="text-sm text-red-600 bg-white dark:bg-zinc-900 bg-opacity-80 rounded px-2 py-1 shadow hover:bg-red-100 hover:text-red-800 transition"
                >
                  Delete
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
