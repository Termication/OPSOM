"use client";

import { useEffect, useState } from "react";
import { FileText, Sparkles, Download, Timer } from "lucide-react";
import clsx from "clsx";

const steps = [
  {
    icon: <FileText className="w-8 h-8 text-green-600" />,
    title: "Upload PDF",
    description: "Choose a PDF file you want summarized.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-emerald-600" />,
    title: "Get Summary",
    description: "AI analyzes and condenses key points instantly.",
  },
  {
    icon: <Timer className="w-8 h-8 text-teal-600" />,
    title: "Save Time",
    description: "No more skimming pages — get to the point fast.",
  },
  {
    icon: <Download className="w-8 h-8 text-lime-600" />,
    title: "Download or Share",
    description: "Use your summary however you need.",
  },
];

export default function Demo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Autoplay only on desktop
  useEffect(() => {
    if (!isDesktop) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isDesktop]);

  return (
    <section className="py-12 px-4 bg-transparent">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
        How Opsom Works
      </h2>

      <div className="relative overflow-x-auto sm:overflow-visible">
        <div
          className={clsx("flex gap-6 transition-transform duration-500", {
            "sm:justify-center": true,
          })}
          style={{
            transform: isDesktop
              ? `translateX(-${activeIndex * 280}px)`
              : "none",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className={clsx(
                "w-[260px] shrink-0 rounded-2xl border p-6 shadow-md transition-all duration-300",
                "bg-white border-gray-200 text-gray-900 dark:bg-gray-900 dark:border-gray-800 dark:text-white",
                {
                  "ring-2 ring-green-400 scale-105": isDesktop && i === activeIndex,
                  "opacity-60": isDesktop && i !== activeIndex,
                }
              )}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
