import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
    return <section>
        <div className="">
            <div className="flex">
                <Sparkles className="h-6 w-6 text-green-900 animate-pulse" />
                <p>Powerd by AI</p>
            </div>

            <h1>
                Summarize PDFs into key points <br />
                and insights.
            </h1>
            <h2>
                Upload your PDF and get a summary in seconds.
                <br />
                Save time and effort by quickly extracting key information from your PDFs.
            </h2>

            <Button>
                Try Opsom
            </Button>
        </div>

    </section>
}