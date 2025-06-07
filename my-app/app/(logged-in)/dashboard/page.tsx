import AnimatedCard from "@/components/common/animated-card";
import BgGradient from "@/components/common/bg-gradient";

// DashboardPage Component
export default function DashboardPage() {
  return (
    <section className="relative min-h-screen px-4 pt-20">
      <BgGradient />
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold">Your Summaries</h1>
        <p className="text-gray-600">Manage your uploads and view summaries.</p>
      </div>

      // Animated Cards for Actions
      <div className="grid gap-6 mt-10 max-w-4xl mx-auto grid-cols-1 sm:grid-cols-2">
        <AnimatedCard
          title="Create New Summary"
          description="Upload a PDF and get a smart summary instantly."
          href="/upload"
        />
        <AnimatedCard
          title="View Past Summaries"
          description="Check all your saved summaries in one place."
          href="/summaries"
        />
      </div>
    </section>
  );
}
