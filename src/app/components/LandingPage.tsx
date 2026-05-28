import { UserCheck, Search, Handshake, ShieldCheck, Zap, Languages, ArrowRight } from "lucide-react";
import { Language, t } from "./mockData";

type Props = { language: Language; onNavigate: (page: string) => void };

export function LandingPage({ language, onNavigate }: Props) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f5f0" }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="px-4 pt-12 pb-16 text-center max-w-2xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6"
          style={{ backgroundColor: "#e8f5ee", color: "#3d8b5e" }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#3d8b5e" }} />
          {t("heroTagline", language)}
        </div>

        <h1
          className="mb-4 px-2"
          style={{ color: "#1a2e1f", fontSize: "clamp(1.75rem,6vw,2.75rem)", fontWeight: 700, lineHeight: 1.2 }}
        >
          {t("heroTitle", language)}
        </h1>

        <p className="text-base mb-10 px-2 leading-relaxed mx-auto" style={{ color: "#4b6b55", maxWidth: 520 }}>
          {t("heroSubtitle", language)}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <button
            onClick={() => onNavigate("find-workers")}
            className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            style={{ backgroundColor: "#e8732a" }}
          >
            <Search className="w-5 h-5" />
            {t("imEmployer", language)}
          </button>
          <button
            onClick={() => onNavigate("register-worker")}
            className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base border-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            style={{ color: "#3d8b5e", borderColor: "#3d8b5e", backgroundColor: "white" }}
          >
            <UserCheck className="w-5 h-5" />
            {t("imWorker", language)}
          </button>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────── */}
      <section className="px-4 pb-12">
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "2,400+", label: t("statsWorkers", language) },
            { value: "850+",   label: t("statsEmployers", language) },
            { value: "18",     label: t("statsTaluks", language) },
            { value: "11",     label: t("statsSkills", language) },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold mb-1" style={{ color: "#3d8b5e" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "#6b7280" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="px-4 py-14 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-3" style={{ color: "#1a2e1f", fontSize: "1.5rem", fontWeight: 700 }}>
            {t("howItWorks", language)}
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#6b7280" }}>
            {language === "kn" ? "ಕೆಲಸಗಾರರು ಮತ್ತು ಉದ್ಯೋಗದಾತರನ್ನು ಸಂಪರ್ಕಿಸಲು ಮೂರು ಸರಳ ಹಂತಗಳು"
              : language === "hi" ? "कामगारों और नियोक्ताओं को जोड़ने के तीन सरल चरण"
              : "Three simple steps to connect workers and employers"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <UserCheck className="w-7 h-7" style={{ color: "#3d8b5e" }} />, title: t("step1Title", language), desc: t("step1Desc", language), step: "1", bg: "#e8f5ee" },
              { icon: <Search    className="w-7 h-7" style={{ color: "#e8732a" }} />, title: t("step2Title", language), desc: t("step2Desc", language), step: "2", bg: "#fef3ea" },
              { icon: <Handshake className="w-7 h-7" style={{ color: "#3d8b5e" }} />, title: t("step3Title", language), desc: t("step3Desc", language), step: "3", bg: "#e8f5ee" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl" style={{ backgroundColor: "#f7f5f0" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 relative" style={{ backgroundColor: item.bg }}>
                  {item.icon}
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#3d8b5e" }}>
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-semibold" style={{ color: "#1a2e1f" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className="px-4 py-14" style={{ backgroundColor: "#f7f5f0" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-10" style={{ color: "#1a2e1f", fontSize: "1.5rem", fontWeight: 700 }}>
            {t("whyRuralUnite", language)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <ShieldCheck className="w-6 h-6" />, title: t("trustedWorkers", language),  desc: t("trustedWorkersDesc", language), color: "#3d8b5e", bg: "#e8f5ee" },
              { icon: <Zap         className="w-6 h-6" />, title: t("quickConnect", language),     desc: t("quickConnectDesc", language),   color: "#e8732a", bg: "#fef3ea" },
              { icon: <Languages   className="w-6 h-6" />, title: t("multiLanguage", language),    desc: t("multiLanguageDesc", language),   color: "#3d8b5e", bg: "#e8f5ee" },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold" style={{ color: "#1a2e1f" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────────── */}
      <section className="px-4 py-14 bg-white">
        <div className="max-w-2xl mx-auto rounded-3xl p-8 text-center" style={{ backgroundColor: "#e8f5ee" }}>
          <h2 className="mb-3 text-xl font-bold" style={{ color: "#1a2e1f" }}>{t("readyToStart", language)}</h2>
          <p className="text-sm mb-6" style={{ color: "#4b6b55" }}>{t("readyDesc", language)}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate("find-workers")}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
              style={{ backgroundColor: "#e8732a" }}
            >
              {t("findWorkers", language)}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("register-worker")}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2"
              style={{ color: "#3d8b5e", borderColor: "#3d8b5e", backgroundColor: "white" }}
            >
              {t("registerWorker", language)}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="px-4 py-8 text-center" style={{ backgroundColor: "#f7f5f0" }}>
        <div className="text-sm" style={{ color: "#9ca3af" }}>
          © 2026 {t("appName", language)} · {language === "kn" ? "ಗ್ರಾಮೀಣ ಕರ್ನಾಟಕವನ್ನು ಸಂಪರ್ಕಿಸುವುದು" : language === "hi" ? "ग्रामीण कर्नाटक को जोड़ना" : "Connecting Rural Karnataka"}
        </div>
      </footer>
    </div>
  );
}
