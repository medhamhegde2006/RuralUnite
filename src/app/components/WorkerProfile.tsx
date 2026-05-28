import { useState } from "react";
import { ArrowLeft, MapPin, Clock, Phone, Languages, Briefcase, Send, CheckCircle } from "lucide-react";
import { Language, t, Worker, getSkillLabel } from "./mockData";

type Props = { language: Language; worker: Worker; onBack: () => void };

export function WorkerProfile({ language, worker, onBack }: Props) {
  const [requestSent, setRequestSent] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const isAvailable = worker.availability === "Available";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f5f0" }}>
      <div className="max-w-lg mx-auto px-4 py-8">
        <button onClick={onBack} className="flex items-center gap-2 mb-6 text-sm" style={{ color: "#3d8b5e" }}>
          <ArrowLeft className="w-4 h-4" />
          {t("backToWorkers", language)}
        </button>

        {/* Profile card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ backgroundColor: "#3d8b5e" }}>
              {worker.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-0.5" style={{ color: "#1a2e1f" }}>{worker.name[language]}</h1>
              <p className="text-base font-medium mb-2" style={{ color: "#e8732a" }}>{getSkillLabel(worker.skill, language)}</p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: isAvailable ? "#e8f5ee" : "#fef3ea", color: isAvailable ? "#3d8b5e" : "#e8732a" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isAvailable ? "#3d8b5e" : "#e8732a" }} />
                {isAvailable ? t("available", language) : t("busy", language)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <InfoRow icon={<MapPin className="w-4 h-4" />}     label={t("location", language)}         value={`${worker.village[language]}, ${worker.taluk[language]}, ${worker.district[language]}`} />
            <InfoRow icon={<Briefcase className="w-4 h-4" />}  label={t("experience", language)}       value={`${worker.experience} ${t("years", language)}`} />
            <InfoRow icon={<Clock className="w-4 h-4" />}      label={t("workingHoursLabel", language)} value={worker.workingHours} />
            <InfoRow icon={<Languages className="w-4 h-4" />}  label={t("languagesKnown", language)}   value={worker.languages.join(", ")} />
            <InfoRow icon={<Phone className="w-4 h-4" />}      label={t("phoneNumber", language)}      value={worker.phone} highlight />
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-sm leading-relaxed" style={{ color: "#4b6b55" }}>
              {worker.description[language]}
            </p>
          </div>
        </div>

        {/* Request sent banner */}
        {requestSent && (
          <div className="rounded-2xl p-4 mb-4 flex items-start gap-3" style={{ backgroundColor: "#e8f5ee" }}>
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#3d8b5e" }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "#1a2e1f" }}>{t("requestSentTitle", language)}</p>
              <p className="text-xs mt-0.5" style={{ color: "#4b6b55" }}>
                {worker.name[language]} {t("requestSentDesc", language)}
              </p>
            </div>
          </div>
        )}

        {/* Request form */}
        {showForm && !requestSent && (
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
            <h3 className="text-base font-semibold mb-3" style={{ color: "#1a2e1f" }}>{t("sendHireRequest", language)}</h3>
            <div className="mb-3">
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("yourMessage", language)}</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
                placeholder={t("describeWork", language)}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                style={{ borderColor: "#e5e7eb", color: "#1a2e1f" }} />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium border"
                style={{ color: "#6b7280", borderColor: "#e5e7eb" }}>
                {t("cancel", language)}
              </button>
              <button onClick={() => { setRequestSent(true); setShowForm(false); }}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-1.5"
                style={{ backgroundColor: "#3d8b5e" }}>
                <Send className="w-4 h-4" />
                {t("sendRequest", language)}
              </button>
            </div>
          </div>
        )}

        {/* Expiry note */}
        {showForm && !requestSent && (
          <p className="text-xs text-center mb-4" style={{ color: "#9ca3af" }}>{t("requestExpiry", language)}</p>
        )}

        {/* Action buttons */}
        {!requestSent && (
          <div className="flex flex-col gap-3">
            <a href={`tel:${worker.phone}`}
              className="w-full py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 shadow-sm"
              style={{ backgroundColor: "#3d8b5e" }}>
              <Phone className="w-5 h-5" />
              {t("contact", language)} — {worker.phone}
            </a>
            {!showForm && (
              <button onClick={() => setShowForm(true)}
                className="w-full py-4 rounded-2xl font-semibold text-base border-2 flex items-center justify-center gap-2"
                style={{ color: "#e8732a", borderColor: "#e8732a", backgroundColor: "white" }}>
                <Send className="w-5 h-5" />
                {t("sendRequest", language)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#f7f5f0", color: "#3d8b5e" }}>
        {icon}
      </div>
      <div>
        <p className="text-xs mb-0.5" style={{ color: "#9ca3af" }}>{label}</p>
        <p className="text-sm font-medium" style={{ color: highlight ? "#3d8b5e" : "#1a2e1f" }}>{value}</p>
      </div>
    </div>
  );
}
