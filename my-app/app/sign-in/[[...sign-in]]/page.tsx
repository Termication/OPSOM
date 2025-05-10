import { SignIn } from "@clerk/nextjs";
import BgGradient from "@/components/common/bg-gradient";

export default function Page() {
  return (
    <BgGradient>
      <section className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </section>
    </BgGradient>
  );
}
