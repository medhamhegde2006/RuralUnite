import { useState } from "react";
import { ToggleLeft, ToggleRight, Clock, MapPin, CheckCircle, XCircle, Briefcase, Edit3, History, User } from "lucide-react";
import { Language, t, MOCK_REQUESTS, HireRequest, getSkillLabel } from "./mockData";

type Props = { language: Language; onNavigate: (page: string) => void };

const WORKER = {
  name: { en: "Ravi Poojary", kn: "ರವಿ ಪೂಜಾರಿ", hi: "रवि पूजारी" },
  skill: "Mason",
  village: { en: "Padubidri", kn: "ಪಾದುಬಿದ್ರಿ", hi: "पादुबिद्री" },
  taluk:   { en: "Udupi",     kn: "ಉಡುಪಿ",       hi: "उडुपी" },
  experience: 8,
  phone: "+91 94483 21056",
  avatar: "RP",
};

function statusLabel(status: HireRequest["status"], language: Language) {
  const map: Record<HireRequest["status"], string> = {
    pending:  t("pending",  language),
    accepted: t("accepted", language),
    rejected: t("rejected", language),
    expired:  t("expired",  language),
  };
  return map[status];
}

function statusStyle(status: HireRequest["status"]) {
  const map: Record<HireRequest["status"], { bg: string; color: string }> = {
    pending:  { bg: "#fef3ea", color: "#e8732a" },
    accepted: { bg: "#e8f5ee", color: "#3d8b5e" },
    rejected: { bg: "#fee2e2", color: "#ef4444" },
    expired:  { bg: "#f3f4f6", color: "#9ca3af" },
  };
  return map[status];
}

function RequestCard({ req, language, onAction, showActions }: {
  req: HireRequest; language: Language;
  onAction: (id: number, action: "accepted" | "rejected") => void;
  showActions: boolean;
}) {
  const st = statusStyle(req.status);
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <p className="text-sm font-semibold" style={{ color: "#1a2e1f" }}>{req.employerName[language]}</p>
          <p className="text-xs mt-0.5" style={{ color: "#e8732a" }}>
            {getSkillLabel(req.workType, language)} · {req.location[language]}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: st.bg, color: st.color }}>
            {statusLabel(req.status, language)}
          </span>
          <span className="text-xs" style={{ color: "#9ca3af" }}>{req.date}</span>
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-4 p-3 rounded-xl" style={{ color: "#374151", backgroundColor: "#f7f5f0" }}>
        "{req.message[language]}"
      </p>
      {showActions && (
        <div className="flex gap-2">
          <button onClick={() => onAction(req.id, "rejected")}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium border flex items-center justify-center gap-1.5"
            style={{ color: "#ef4444", borderColor: "#fecaca", backgroundColor: "#fff5f5" }}>
            <XCircle className="w-4 h-4" />
            {t("reject", language)}
          </button>
          <button onClick={() => onAction(req.id, "accepted")}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-1.5 hover:opacity-90"
            style={{ backgroundColor: "#3d8b5e" }}>
            <CheckCircle className="w-4 h-4" />
            {t("accept", language)}
          </button>
        </div>
      )}
    </div>
  );
}

export function WorkerDashboard({ language, onNavigate }: Props) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [requests, setRequests] = useState<HireRequest[]>(MOCK_REQUESTS);
  const [activeTab, setActiveTab] = useState<"requests" | "history">("requests");

  const pending  = requests.filter((r) => r.status === "pending");
  const history  = requests.filter((r) => r.status !== "pending");

  const handleAction = (id: number, action: "accepted" | "rejected") =>
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: action } : r)));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f5f0" }}>
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-6" style={{ color: "#1a2e1f" }}>{t("dashboard", language)}</h1>

        {/* Profile summary */}
        <div className="bg-white rounded-3xl p-5 shadow-sm mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base flex-shrink-0" style={{ backgroundColor: "#3d8b5e" }}>
              {WORKER.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold" style={{ color: "#1a2e1f" }}>{WORKER.name[language]}</h2>
              <p className="text-sm" style={{ color: "#e8732a" }}>{getSkillLabel(WORKER.skill, language)}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
                  <MapPin className="w-3 h-3" />
                  {WORKER.village[language]}, {WORKER.taluk[language]}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
                  <Briefcase className="w-3 h-3" />
                  {WORKER.experience} {t("years", language)}
                </span>
              </div>
            </div>
            <button className="p-2 rounded-xl border" style={{ borderColor: "#e5e7eb", color: "#6b7280" }}>
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Availability toggle */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: "#374151" }}>{t("toggleAvailability", language)}</p>
              <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                {isAvailable ? t("visibleToEmployers", language) : t("hiddenFromSearch", language)}
              </p>
            </div>
            <button onClick={() => setIsAvailable(!isAvailable)} className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: isAvailable ? "#3d8b5e" : "#9ca3af" }}>
                {isAvailable ? t("available", language) : t("busy", language)}
              </span>
              {isAvailable
                ? <ToggleRight className="w-8 h-8" style={{ color: "#3d8b5e" }} />
                : <ToggleLeft  className="w-8 h-8" style={{ color: "#9ca3af" }} />}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: t("pending",  language), value: pending.length,                                         color: "#e8732a", bg: "#fef3ea" },
            { label: t("accepted", language), value: requests.filter((r) => r.status === "accepted").length, color: "#3d8b5e", bg: "#e8f5ee" },
            { label: language === "kn" ? "ಒಟ್ಟು" : language === "hi" ? "कुल" : "Total",
              value: requests.length, color: "#6b7280", bg: "#f3f4f6" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 text-center shadow-sm">
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-5">
          {[
            { key: "requests", icon: <Clock className="w-4 h-4" />,   label: t("incomingRequests", language) },
            { key: "history",  icon: <History className="w-4 h-4" />, label: t("requestHistory",   language) },
          ].map((tab) => (
            <button key={tab.key}
              onClick={() => setActiveTab(tab.key as "requests" | "history")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ backgroundColor: activeTab === tab.key ? "#3d8b5e" : "transparent", color: activeTab === tab.key ? "white" : "#6b7280" }}>
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.key === "requests"
                ? (language === "kn" ? "ವಿನಂತಿಗಳು" : language === "hi" ? "अनुरोध" : "Requests")
                : (language === "kn" ? "ಇತಿಹಾಸ"    : language === "hi" ? "इतिहास"  : "History")}</span>
            </button>
          ))}
        </div>

        {/* Requests tab */}
        {activeTab === "requests" && (
          <div className="space-y-3">
            {pending.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                <User className="w-10 h-10 mx-auto mb-3" style={{ color: "#d1d5db" }} />
                <p className="text-sm font-medium" style={{ color: "#374151" }}>{t("noPendingRequests", language)}</p>
                <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{t("newRequestsHere", language)}</p>
              </div>
            ) : pending.map((req) => (
              <RequestCard key={req.id} req={req} language={language} onAction={handleAction} showActions />
            ))}
          </div>
        )}

        {/* History tab */}
        {activeTab === "history" && (
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                <History className="w-10 h-10 mx-auto mb-3" style={{ color: "#d1d5db" }} />
                <p className="text-sm font-medium" style={{ color: "#374151" }}>{t("noHistory", language)}</p>
              </div>
            ) : history.map((req) => (
              <RequestCard key={req.id} req={req} language={language} onAction={handleAction} showActions={false} />
            ))}
          </div>
        )}

        {/* Expiry notice */}
        <p className="text-xs text-center mt-6" style={{ color: "#9ca3af" }}>{t("requestExpiry", language)}</p>
      </div>
    </div>
  );
}
