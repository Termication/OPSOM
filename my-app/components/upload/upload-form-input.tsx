'use client';

import { Loader2 } from 'lucide-react';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  formRef: React.RefObject<HTMLFormElement>;
}

export default function UploadFormInput({ onSubmit, isSubmitting, formRef }: UploadFormInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      ref={formRef}
      className={isSubmitting ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}
    >
      <span>Upload here</span>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
        <input
          id="file"
          name="file"
          type="file"
          accept="application/pdf"
          required
          className="block w-full text-sm text-gray-700 dark:text-gray-200
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-none file:outline-none file:shadow-none
                    file:text-sm file:font-semibold
                    file:bg-emerald-100 file:text-emerald-800
                    hover:file:bg-emerald-200
                    transition"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center  px-6 py-2 rounded-md font-semibold text-white
                     bg-gradient-to-r from-emerald-500 to-teal-500
                     hover:from-emerald-600 hover:to-teal-600
                     transition shadow-md"
        >
          {isSubmitting ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' />Processing</> : 'Upload'}
        </button>
      </div>
    </form>
  );
}
