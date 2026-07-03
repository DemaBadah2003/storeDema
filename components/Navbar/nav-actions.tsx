"use client";
import Link from "next/link";
import LanguageSwitcher from "./languge";
import { useTranslation } from "react-i18next";
import i18next from "../../i18n/config";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const Divider = () => (
  <div className="w-px bg-[#dfc4b5] h-8 shrink-0" />
);

export default function NavActions() {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = status === "authenticated" && session?.user;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ توجيه ذكي حسب الدور
  const handleAccountManagementClick = () => {
    if (!isLoggedIn) {
      router.push("/signin");
      return;
    }
    if (session.user.roleSlug === "admin") {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  };

  return (
    <div className="flex items-center gap-0">

      <LanguageSwitcher />

      <Divider />

      {isLoggedIn ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex flex-col justify-center hover:border hover:border-white rounded px-3 py-1 min-w-fit transition"
          >
            <span className="text-[#5c3e31] font-bold text-sm">
              {session.user.name} ▾
            </span>
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-[#f0e2d8] py-2 z-[9999]">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                تسجيل خروج
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link
            href="/signin"
            className="flex flex-col justify-center hover:border hover:border-white rounded px-3 py-1 min-w-fit transition"
          >
            <span className="text-[#8a6d5f] text-[11px] font-medium text-right">
              {t("hello_login")}
            </span>
            <span className="text-[#5c3e31] font-bold text-sm">
              {t("my_account")} ▾
            </span>
          </Link>

          <Divider />

          <Link
            href="/signup"
            className="flex flex-col justify-center hover:border hover:border-white rounded px-3 py-1 min-w-fit transition"
          >
            <span className="text-[#8a6d5f] text-[11px] font-medium text-right">
              {t("new")}
            </span>
            <span className="text-[#5c3e31] font-bold text-sm">
              {t("create_account")}
            </span>
          </Link>
        </>
      )}

      <Divider />

      {/* ✅ بدل الـ Link الثابت بـ button مع توجيه ذكي حسب الدور */}
      <button
        onClick={handleAccountManagementClick}
        className="flex flex-col justify-center hover:border hover:border-white rounded px-3 py-1 min-w-fit transition"
      >
        <span className="text-[#5c3e31] font-bold text-sm">
          {t("account_management")}
        </span>
      </button>

    </div>
  );
}