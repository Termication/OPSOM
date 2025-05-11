import { Sparkle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function UploadHeader() {
    return (
        <section>
                    <Badge className="mx-auto w-fit flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
        <Sparkle className="w-4 h-4 animate-pulse text-emerald-600 dark:text-emerald-300" />
        <span className="font-medium">AI-Powered</span>
      </Badge>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Just upload your PDF. AI handles the hard part.
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
          Upload your file and let us summarize it instantly.
        </p>

        </section>
    )
}