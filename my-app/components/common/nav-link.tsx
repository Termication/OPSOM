import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavLink({
  href,
  children,
  className,
}: Readonly<{
  href: string;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <Link
      href={href}
      className={cn("no-underline text-gray-900 hover:text-blue-500 transition duration-200 ease-in-out active:text-red-500", className)}
    >
      {children}
    </Link>
  );
}