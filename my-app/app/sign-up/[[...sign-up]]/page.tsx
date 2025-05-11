import { SignUp } from "@clerk/nextjs";
import BgGradient from "@/components/common/bg-gradient";

export default function Page() {
  return (
      <section className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <BgGradient />
          <SignUp />
        </div>
      </section>
  );
}
