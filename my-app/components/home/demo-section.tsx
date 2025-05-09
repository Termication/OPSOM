import { CogIcon} from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4
     sm:px-6">
            <div className="flex items-center justify-center ">
                <CogIcon className="w-6 h-6 text-gray-900 animate-pulse" />
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mt-8">
                How does it work? 
            </h3>

            <p className="text-lg sm:text-xl lg:text-2xl font-normal text-center text-gray-700 mt-4 max-w-3xl mx-auto">
                Watch a demo of <span className="text-green-600">Opsom</span> in action.
            </p>

            <div className="flex items-center justify-center mt-8">
 
            </div>
        </div>
    </section>
  );
}