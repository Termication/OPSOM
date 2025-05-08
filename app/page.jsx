import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/login">Login Here</Link>
      <p>This is a page component.</p>
    </div>
  );
}