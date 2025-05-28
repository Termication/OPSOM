import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, FileText, FolderOpen } from "lucide-react";

export default function DashboardPage() {
  return (
    <section className="relative min-h-screen px-4 pt-20 dark:bg-gray-950">
      <BgGradient />

      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Your PDF Summaries
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Easily view, manage, and create new summaries.
        </p>
      </div>

      <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-xl transition-shadow cursor-pointer">
          <Link href="/upload" className="block h-full w-full">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <PlusCircle className="w-10 h-10 text-blue-600 mb-2" />
              <p className="text-blue-600 font-medium">New Summary</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-xl transition-shadow cursor-pointer">
          <Link href="/summaries" className="block h-full w-full">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FileText className="w-10 h-10 text-green-600 mb-2" />
              <p className="text-green-600 font-medium">View Summaries</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-xl transition-shadow cursor-pointer">
          <Link href="/history" className="block h-full w-full">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FolderOpen className="w-10 h-10 text-purple-600 mb-2" />
              <p className="text-purple-600 font-medium">Summary History</p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </section>
  );
}
