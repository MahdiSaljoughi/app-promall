"use client";

import Header from "@/components/Dashboard/Header/Header";
import { useParams } from "next/navigation";

export default function LayoutProfile({ children }) {
  const { shop } = useParams();

  return (
    <div className="min-h-screen lg:p-20">
      <div className="lg:border dark:border-zinc-700 rounded-3xl p-4">
        <div className="mb-4">
          <Header shopId={shop} />
        </div>
        <>{children}</>
      </div>
    </div>
  );
}
