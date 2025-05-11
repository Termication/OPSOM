import BgGradient from "@/components/common/bg-gradient";
import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";

export default function Page() {
  return (
    <section className="relative min-h-screen px-4 pt-20">
      <BgGradient />

      <div className="max-w-2xl mx-auto text-center space-y-6">
        <UploadHeader />
        <UploadForm />
      </div>
    </section>
  );
}
