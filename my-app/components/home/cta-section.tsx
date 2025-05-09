export default function CTASection() {
    return (
        <div className="relative flex flex-col items-center justify-center w-full py-16 bg-gradient-to-b from-green-100 via-emerald-200 to-teal-100 dark:from-green-900 dark:via-emerald-800 dark:to-teal-900">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Ready to get started?
        </h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Join us today and experience the difference!
        </p>
        <a
            href="/signup"
            className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
            Sign Up Now
        </a>
        </div>
    );
    }