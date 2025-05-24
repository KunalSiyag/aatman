import type { ReactNode } from "react";
import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { User } from "lucide-react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getAuthUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ---------- page body ---------- */}
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl p-6">{children}</div>
      </main>
    </div>
  );
}
