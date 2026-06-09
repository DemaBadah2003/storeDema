import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex flex-col items-center justify-center border border-transparent hover:border-[#dfc4b5] hover:bg-white/30 rounded-xl px-4 py-1.5 min-w-fit shrink-0 transition-all"
    >
      <div className="w-9 h-9 bg-gradient-to-br from-[#d48c56] to-[#b36d39] rounded-full flex items-center justify-center text-white font-extrabold text-base shadow-md">
        د
      </div>
      <span className="text-[#5c3e31] font-extrabold text-[13px] leading-tight mt-1">متجر ديما</span>
      <span className="text-[#b36d39] text-[10px] font-bold tracking-wide">Daima Store</span>
    </Link>
  );
}