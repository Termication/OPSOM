'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  className,
}: Readonly<{
  href: string;
  children: React.ReactNode;
  className?: string;
}>) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn("no-underline text-gray-900 hover:text-blue-500 transition duration-200 ease-in-out active:text-red-500", className, isActive && 'text-rose-400')}
    >
      {children}
    </Link>
  );
}