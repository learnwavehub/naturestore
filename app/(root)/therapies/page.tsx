// app/(root)/therapies/page.tsx
"use client";

import { Suspense } from "react";
import TherapiesContent from "@/components/therapies/Therapy";

export default function TherapiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading therapies...</p>
        </div>
      </div>
    }>
      <TherapiesContent />
    </Suspense>
  );
}