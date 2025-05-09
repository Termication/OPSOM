import Link from "next/link";

export default function PricingSection() {
  return (
    <section>
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mt-2">
            Choose a plan that fits your needs.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Basic Plan */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Basic</h3>
            <p className="mt-2 text-2xl font-bold text-green-600">Free</p>
            <ul className="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>✅ 7 PDFs per day</li>
              <li>✅ Access core features</li>
              <li>✅ Standard processing speed</li>
            </ul>
            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-md ring-2 ring-green-400">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Pro</h3>
            <p className="mt-2 text-2xl font-bold text-emerald-600">ZAR 60 / mo</p>
            <ul className="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>✅ Unlimited PDFs</li>
              <li>✅ Priority processing</li>
              <li>✅ Early access to features</li>
            </ul>
            <button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg">
              <Link href={"/#payment"}>Upgrade Now </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
