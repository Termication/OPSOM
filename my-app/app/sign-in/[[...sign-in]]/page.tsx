import { SignIn } from '@clerk/nextjs';
import BgGradient from "@/components/common/bg-gradient";

export default function Page() {
  return (
    <BgGradient>
      <section className="flex justify-center items-center min-h-screen">
        <div className="py-12 px-4 sm:px-6">
          <SignIn />
        </div>
      </section>
    </BgGradient>
  );
}
