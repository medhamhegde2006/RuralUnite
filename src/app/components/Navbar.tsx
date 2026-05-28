import { useState } from "react";
import { Menu, X, Globe, Sprout } from "lucide-react";
import { Language, t } from "./mockData";

type NavbarProps = {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
};

export function Navbar({ language, onLanguageChange, onNavigate, currentPage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const langLabels: Record<Language, string> = { en: "EN", kn: "ಕನ್ನಡ", hi: "हिंदी" };

  const navLinks = [
    { labelKey: "home" as const,           page: "landing" },
    { labelKey: "findWorkers" as const,    page: "find-workers" },
    { labelKey: "registerWorker" as const, page: "register-worker" },
    { labelKey: "aboutUs" as const,        page: "about" },
  ];

  const close = () => { setMenuOpen(false); setLangMenuOpen(false); };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => { onNavigate("landing"); close(); }} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#3d8b5e" }}>
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold" style={{ color: "#1a2e1f" }}>{t("appName", language)}</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ labelKey, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className="text-sm transition-colors"
              style={{ color: currentPage === page ? "#3d8b5e" : "#4b5563", fontWeight: currentPage === page ? 600 : 400 }}
            >
              {t(labelKey, language)}
            </button>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-gray-300 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{langLabels[language]}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[120px] z-50">
                {(["en", "kn", "hi"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { onLanguageChange(lang); setLangMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                    style={{ color: language === lang ? "#3d8b5e" : "#374151", fontWeight: language === lang ? 600 : 400 }}
                  >
                    {langLabels[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate("login")}
            className="px-4 py-2 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#3d8b5e" }}
          >
            {t("getStarted", language)}
          </button>
        </div>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-2">
          <div className="relative">
            <button
              onClick={() => { setLangMenuOpen(!langMenuOpen); setMenuOpen(false); }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="text-xs">{langLabels[language]}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[120px] z-50">
                {(["en", "kn", "hi"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { onLanguageChange(lang); setLangMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50"
                    style={{ color: language === lang ? "#3d8b5e" : "#374151", fontWeight: language === lang ? 600 : 400 }}
                  >
                    {langLabels[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => { setMenuOpen(!menuOpen); setLangMenuOpen(false); }}
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          {navLinks.map(({ labelKey, page }) => (
            <button
              key={page}
              onClick={() => { onNavigate(page); close(); }}
              className="text-left px-3 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              style={{ color: currentPage === page ? "#3d8b5e" : "#374151", fontWeight: currentPage === page ? 600 : 400 }}
            >
              {t(labelKey, language)}
            </button>
          ))}
          <div className="pt-2 mt-1 border-t border-gray-100">
            <button
              onClick={() => { onNavigate("login"); close(); }}
              className="w-full py-3 rounded-xl text-white text-sm font-medium"
              style={{ backgroundColor: "#3d8b5e" }}
            >
              {t("getStarted", language)}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
