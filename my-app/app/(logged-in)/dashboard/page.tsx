import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <section className="relative min-h-screen px-4 pt-20">
    <BgGradient />

      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold">Your Summaries</h1>
        <p className="text-gray-600">Manage your uploads and view summaries.</p>
      </div>

      <div>
        <Button variant={'link'}>
            <Link href="/upload" className="text-blue-600 hover:underline">
              New Summary
            </Link>
        </Button>
      </div>


    </section>
  );
}