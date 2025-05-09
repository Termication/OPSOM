import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import Link from "next/link";


export default function HeroSection() {
    return <section className="relative mx-auto flex flex-col z=0
         items-center justify-center py-16 sm:py-20 lg:py-28
        transition-all animate-in lg:px-12 max-w-7xl">
            <div className="flex">
                <Badge className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-sm flex items-center gap-2 px-3 py-1">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 to-blue-500 opacity-50 blur-[2px] animate-pulse"></div>
                    <Sparkles className="h-6 w-6 text-black animate-pulse" />
                    <p className="text-white">Powerd by AI</p>
                </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-gray-900 mt-8">
                Summarize PDFs into key  
                <span className="relative inline-block">
                    <span className="relative z-10 px-4"> points </span><br />
                    <span className="absolute inset-0 bg-green-200/50 -rotate-2
                    rounded-lg transform -skew-y-1
                    "></span>
                    
                </span>
                and insights.
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-normal text-center text-gray-700 mt-4 max-w-3xl">
                Upload your PDF and get a summary in seconds.
                <br />
                Save time and effort by quickly extracting key information from your PDFs.
            </h2>

            <Button
            asChild
            variant="link"
            className="mt-6 rounded-full px-6 py-3 text-base sm:text-lg lg:text-xl font-semibold text-white bg-linear-to-r from-slate-700 to-green-900 hover:from-green-800 hover:to-slate-900 hover:no-underline"
            >
            <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 no-underline hover:no-underline"
            >
                <span>Try Opsom</span>
                <ArrowRight className="w-5 h-5 animate-pulse" />
            </Link>
            </Button>

    </section>
}