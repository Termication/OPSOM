"use client";

import { toast } from "react-hot-toast";
import { useTransition } from "react";
import { deleteSummary } from "@/actions/delete-summary";

interface Props {
  summaryId: string;
}

export function DeleteSummaryButton({ summaryId }: Props) {
  const [isPending, startTransition] = useTransition();

 return (
    <button
      onClick={() =>
        startTransition(async () => {
          try {
            await deleteSummary(summaryId);
            toast.success("Summary deleted");
          } catch (err) {
            toast.error("Failed to delete summary");
          }
        })
      }
      disabled={isPending}
      className="text-sm text-red-600 hover:text-red-800 transition disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
