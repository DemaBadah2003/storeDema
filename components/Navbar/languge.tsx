"use client";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "../../i18n/config"; // ← التعديل هنا

const languages = [
  { code: "ar", label: "العربية", short: "AR", flag: "🇵🇸" },
  { code: "en", label: "English", short: "EN", flag: "🇺🇸" },
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleToggle = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen(!open);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        onClick={handleToggle}
        className="flex flex-col justify-center border border-transparent hover:border-[#dfc4b5] hover:bg-white/40 rounded-xl px-3 py-1 cursor-pointer min-w-fit transition"
      >
        <span className="text-[#8a6d5f] text-[11px] font-medium text-right">{t("language")}</span>
        <span className="text-[#5c3e31] font-bold text-sm">
          {current.short} ▾
        </span>
      </div>

      {open && (
        <div
          className="fixed bg-white border border-[#dfc4b5] rounded-xl shadow-xl z-[9999] overflow-hidden min-w-[140px]"
          style={{ top: dropdownPos.top, right: dropdownPos.right }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18next.changeLanguage(lang.code); // ← i18next مباشرة بدل i18n
                document.dir = lang.code === "ar" ? "rtl" : "ltr";
                setOpen(false);
              }}
              className={`w-full text-right px-4 py-2 text-sm hover:bg-[#f5ece7] transition flex items-center gap-2
                ${current.code === lang.code
                  ? "font-bold text-[#b36d39] bg-[#fdf6f2]"
                  : "text-[#5c3e31]"
                }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {current.code === lang.code && (
                <span className="mr-auto text-[#b36d39]">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}