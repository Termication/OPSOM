import React from "react";

type BgGradientProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function BgGradient({ children, className }: BgGradientProps) {
  return (
    <div className="relative z-0">
      <div
        className={`fixed inset-0 -z-10 pointer-events-none bg-gradient-to-br 
        from-green-100 via-emerald-200 to-teal-100 
        dark:from-green-900 dark:via-emerald-800 dark:to-teal-900 ${className || ""}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-300/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200/30 via-transparent to-transparent" />
      </div>
      {children}
    </div>
  );
}
