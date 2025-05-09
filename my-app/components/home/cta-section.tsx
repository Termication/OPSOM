import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Your time is precious. Let’s summarize.
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Join Opsom and turn your PDFs into clear, concise insights in seconds.
        </p>
        <Link
          href="/#pricing"
          className="mt-8 inline-block px-8 py-3 text-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400 dark:focus:ring-emerald-600"
        >
          GET STARTED
        </Link>
      </div>
    </section>
  );
}
