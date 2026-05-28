import { ArrowLeft, Sprout, Users, MapPin, Globe } from "lucide-react";
import { Language, t } from "./mockData";

type Props = {
  language: Language;
  onNavigate: (page: string) => void;
};

export function AboutUs({ language, onNavigate }: Props) {
  const bodyParagraphs = t("aboutUsBody", language).split("\n\n");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f5f0" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-2 mb-6 text-sm"
          style={{ color: "#3d8b5e" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToHome", language)}
        </button>

        {/* Hero Card */}
        <div
          className="rounded-3xl p-7 mb-6 text-center"
          style={{ backgroundColor: "#e8f5ee" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#3d8b5e" }}
          >
            <Sprout className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#1a2e1f" }}>
            {t("aboutUsTitle", language)}
          </h1>
          <p className="text-sm font-medium" style={{ color: "#3d8b5e" }}>
            {t("heroTagline", language)}
          </p>
        </div>

        {/* Body Text */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-5">
          <div className="space-y-4">
            {bodyParagraphs.map((para, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: i === 0 ? "#374151" : "#4b5563" }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: <Users className="w-5 h-5" />, value: "2,400+", label: t("statsWorkers", language), color: "#3d8b5e", bg: "#e8f5ee" },
            { icon: <Globe className="w-5 h-5" />, value: "850+",   label: t("statsEmployers", language), color: "#e8732a", bg: "#fef3ea" },
            { icon: <MapPin className="w-5 h-5" />, value: "18",    label: t("statsTaluks", language), color: "#3d8b5e", bg: "#e8f5ee" },
            { icon: <Sprout className="w-5 h-5" />, value: "11",    label: t("statsSkills", language), color: "#e8732a", bg: "#fef3ea" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: s.bg, color: s.color }}
              >
                {s.icon}
              </div>
              <div>
                <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#9ca3af" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onNavigate("find-workers")}
            className="w-full py-4 rounded-2xl text-white font-semibold text-sm"
            style={{ backgroundColor: "#e8732a" }}
          >
            {t("findWorkers", language)}
          </button>
          <button
            onClick={() => onNavigate("register-worker")}
            className="w-full py-4 rounded-2xl font-semibold text-sm border-2"
            style={{ color: "#3d8b5e", borderColor: "#3d8b5e", backgroundColor: "white" }}
          >
            {t("registerWorker", language)}
          </button>
        </div>
      </div>
    </div>
  );
}
