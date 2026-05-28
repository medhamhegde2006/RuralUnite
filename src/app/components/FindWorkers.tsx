import { useState } from "react";
import { MapPin, Clock, Send, SlidersHorizontal, X } from "lucide-react";
import {
  Language, t,
  MOCK_WORKERS, Worker,
  SKILL_KEYS, getSkillLabel,
  TALUK_OPTIONS_KEYS, TALUK_LABELS,
  EXPERIENCE_OPTIONS_KEYS, EXPERIENCE_LABELS,
  AVAILABILITY_KEYS, AVAILABILITY_LABELS,
} from "./mockData";

type Props = {
  language: Language;
  onSelectWorker: (worker: Worker) => void;
};

function AvailabilityBadge({ status, language }: { status: string; language: Language }) {
  const available = status === "Available";
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: available ? "#e8f5ee" : "#fef3ea", color: available ? "#3d8b5e" : "#e8732a" }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: available ? "#3d8b5e" : "#e8732a" }} />
      {available ? t("available", language) : t("busy", language)}
    </span>
  );
}

function WorkerCard({ worker, language, onView, onRequest }: { worker: Worker; language: Language; onView: () => void; onRequest: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm" style={{ backgroundColor: "#3d8b5e" }}>
          {worker.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-semibold text-base" style={{ color: "#1a2e1f" }}>{worker.name[language]}</h3>
              <p className="text-sm" style={{ color: "#e8732a" }}>{getSkillLabel(worker.skill, language)}</p>
            </div>
            <AvailabilityBadge status={worker.availability} language={language} />
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            <span className="flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
              <MapPin className="w-3.5 h-3.5" />
              {worker.village[language]}, {worker.taluk[language]}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
              <Clock className="w-3.5 h-3.5" />
              {worker.experience} {t("years", language)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={onView}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors"
          style={{ color: "#3d8b5e", borderColor: "#3d8b5e", backgroundColor: "white" }}>
          {t("contact", language)}
        </button>
        <button onClick={onRequest}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#e8732a" }}>
          <Send className="w-3.5 h-3.5" />
          {t("bookRequest", language)}
        </button>
      </div>
    </div>
  );
}

export function FindWorkers({ language, onSelectWorker }: Props) {
  const [filters, setFilters] = useState({ taluk: "all", skill: "", experience: "any", availability: "any" });
  const [showFilters, setShowFilters] = useState(false);

  const filtered = MOCK_WORKERS.filter((w) => {
    if (filters.taluk !== "all" && w.taluk.en !== filters.taluk) return false;
    if (filters.skill && w.skill !== filters.skill) return false;
    if (filters.availability !== "any" && w.availability !== filters.availability) return false;
    if (filters.experience !== "any") {
      const e = w.experience;
      if (filters.experience === "0-1" && e > 1) return false;
      if (filters.experience === "1-3" && (e < 1 || e > 3)) return false;
      if (filters.experience === "3-5" && (e < 3 || e > 5)) return false;
      if (filters.experience === "5+" && e < 5) return false;
    }
    return true;
  });

  const activeCount = [
    filters.taluk !== "all", !!filters.skill,
    filters.experience !== "any", filters.availability !== "any",
  ].filter(Boolean).length;

  const sel = "w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none bg-white transition-colors";
  const selSt = { borderColor: "#e5e7eb", color: "#374151", appearance: "none" as const };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f5f0" }}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-1" style={{ color: "#1a2e1f" }}>{t("findWorkersTitle", language)}</h1>
          <p className="text-sm" style={{ color: "#6b7280" }}>{t("findWorkersSubtitle", language)}</p>
        </div>

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <span className="text-sm" style={{ color: "#6b7280" }}>
            {filtered.length} {t("workersFound", language)}
          </span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors"
            style={{ borderColor: activeCount > 0 ? "#3d8b5e" : "#e5e7eb", color: activeCount > 0 ? "#3d8b5e" : "#374151", backgroundColor: activeCount > 0 ? "#e8f5ee" : "white" }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t("filters", language)}
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#3d8b5e" }}>{activeCount}</span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        <div className={`${showFilters ? "block" : "hidden"} md:block mb-6`}>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 md:hidden">
              <span className="text-sm font-semibold" style={{ color: "#1a2e1f" }}>{t("filters", language)}</span>
              <button onClick={() => setShowFilters(false)}><X className="w-4 h-4" style={{ color: "#9ca3af" }} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* Taluk */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("taluk", language)}</label>
                <select value={filters.taluk} onChange={(e) => setFilters({ ...filters, taluk: e.target.value })} className={sel} style={selSt}>
                  {TALUK_OPTIONS_KEYS.map((k) => <option key={k} value={k}>{TALUK_LABELS[k][language]}</option>)}
                </select>
              </div>
              {/* Skill */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("skillType", language)}</label>
                <select value={filters.skill} onChange={(e) => setFilters({ ...filters, skill: e.target.value })} className={sel} style={selSt}>
                  <option value="">{t("allSkills", language)}</option>
                  {SKILL_KEYS.map((k) => <option key={k} value={k}>{getSkillLabel(k, language)}</option>)}
                </select>
              </div>
              {/* Experience */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("experience", language)}</label>
                <select value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })} className={sel} style={selSt}>
                  {EXPERIENCE_OPTIONS_KEYS.map((k) => <option key={k} value={k}>{EXPERIENCE_LABELS[k][language]}</option>)}
                </select>
              </div>
              {/* Availability */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("availability", language)}</label>
                <select value={filters.availability} onChange={(e) => setFilters({ ...filters, availability: e.target.value })} className={sel} style={selSt}>
                  {AVAILABILITY_KEYS.map((k) => <option key={k} value={k}>{AVAILABILITY_LABELS[k][language]}</option>)}
                </select>
              </div>
            </div>
            {activeCount > 0 && (
              <button
                onClick={() => setFilters({ taluk: "all", skill: "", experience: "any", availability: "any" })}
                className="mt-3 text-xs" style={{ color: "#e8732a" }}
              >
                {t("clearFilters", language)}
              </button>
            )}
          </div>
        </div>

        {/* Count — desktop */}
        <div className="hidden md:flex items-center mb-4">
          <span className="text-sm" style={{ color: "#6b7280" }}>
            <strong style={{ color: "#1a2e1f" }}>{filtered.length}</strong> {t("workersFound", language)}
          </span>
        </div>

        {/* Cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((w) => (
              <WorkerCard key={w.id} worker={w} language={language}
                onView={() => onSelectWorker(w)} onRequest={() => onSelectWorker(w)} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#f7f5f0" }}>
              <SlidersHorizontal className="w-7 h-7" style={{ color: "#9ca3af" }} />
            </div>
            <p className="text-base font-medium mb-1" style={{ color: "#374151" }}>{t("noWorkersFound", language)}</p>
            <p className="text-sm" style={{ color: "#9ca3af" }}>{t("tryAdjusting", language)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
