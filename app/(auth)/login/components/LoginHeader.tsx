// app/(auth)/login/_components/LoginHeader.tsx
"use client";

import Link from "next/link";

export default function LoginHeader() {
  return (
    <Link href="/" className="mb-6 flex flex-col items-center">
      <div className="w-12 h-12 bg-gradient-to-br from-[#d48c56] to-[#b36d39] rounded-full flex items-center justify-center text-white font-extrabold text-xl shadow-md mb-1">
        د
      </div>
      <span className="text-[#5c3e31] font-extrabold text-xl">متجر ديما</span>
    </Link>
  );
}