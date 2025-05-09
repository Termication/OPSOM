import { CogIcon} from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4
     sm:px-6">
            <div className="flex items-center justify-center ">
                <CogIcon className="w-6 h-6 text-gray-900 animate-pulse" />
            </div>
            <p className="text-center text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-4">
            Discover the magic of <span className="font-semibold text-gray-900 dark:text-white">Opsom</span> — your PDF, summarized in seconds.
            </p>


            <div className="flex items-center justify-center mt-8">
 
            </div>
        </div>
    </section>
  );
}