"use client";
import Link from "next/link";
import LanguageSwitcher from "./languge";
import { useTranslation } from "react-i18next";
import i18next from "../../i18n/config";

const Divider = () => (
  <div className="w-px bg-[#dfc4b5] h-8 shrink-0" />
);

export default function NavActions() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-0">

      <LanguageSwitcher />

      <Divider />

      <Link
        href="/login"
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
        href="/register"
        className="flex flex-col justify-center hover:border hover:border-white rounded px-3 py-1 min-w-fit transition"
      >
        <span className="text-[#8a6d5f] text-[11px] font-medium text-right">
          {t("new")}
        </span>
        <span className="text-[#5c3e31] font-bold text-sm">
          {t("create_account")}
        </span>
      </Link>

      <Divider />

      <Link
        href="/orders"
        className="flex flex-col justify-center hover:border hover:border-white rounded px-3 py-1 min-w-fit transition"
      >
        <span className="text-[#8a6d5f] text-[11px] font-medium text-right">
          {t("returns")}
        </span>
        <span className="text-[#5c3e31] font-bold text-sm">
          {t("orders")}
        </span>
      </Link>

    </div>
  );
}