import { useState } from "react";
import { Mic, CheckCircle, ArrowLeft, User, Phone, MapPin, Clock, Briefcase } from "lucide-react";
import { Language, t, SKILL_KEYS, getSkillLabel } from "./mockData";

type Props = { language: Language; onNavigate: (page: string) => void };

export function WorkerRegistration({ language, onNavigate }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "", contactNumber: "", village: "", taluk: "", district: "",
    experience: "", skillType: "", availability: "Available", workingHours: "",
  });

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#f7f5f0" }}>
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-sm">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#e8f5ee" }}>
            <CheckCircle className="w-10 h-10" style={{ color: "#3d8b5e" }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#1a2e1f" }}>{t("registrationSuccess", language)}</h2>
          <p className="text-sm mb-6" style={{ color: "#6b7280" }}>{t("registrationSuccessDesc", language)}</p>
          <div className="rounded-2xl p-4 mb-6 text-left" style={{ backgroundColor: "#f7f5f0" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "#1a2e1f" }}>{form.fullName}</p>
            <p className="text-xs" style={{ color: "#6b7280" }}>
              {getSkillLabel(form.skillType, language)} · {form.taluk}, {form.district}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => onNavigate("worker-dashboard")} className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ backgroundColor: "#3d8b5e" }}>
              {t("viewDashboard", language)}
            </button>
            <button onClick={() => onNavigate("landing")} className="w-full py-3 rounded-xl text-sm font-medium" style={{ color: "#6b7280", backgroundColor: "#f7f5f0" }}>
              {t("backToHome", language)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inp = "w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-colors bg-white";
  const inpStyle = { borderColor: "#e5e7eb", color: "#1a2e1f" };

  const Section = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center gap-2 mb-3 mt-6">
      <span style={{ color: "#3d8b5e" }}>{icon}</span>
      <span className="text-sm font-semibold" style={{ color: "#374151" }}>{text}</span>
    </div>
  );

  const availLabel = (val: string) =>
    val === "Available" ? t("available", language) : t("busy", language);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f5f0" }}>
      <div className="max-w-lg mx-auto px-4 py-8">
        <button onClick={() => onNavigate("landing")} className="flex items-center gap-2 mb-6 text-sm" style={{ color: "#3d8b5e" }}>
          <ArrowLeft className="w-4 h-4" />
          {t("backToHome", language)}
        </button>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-1" style={{ color: "#1a2e1f" }}>{t("registerTitle", language)}</h1>
            <p className="text-sm" style={{ color: "#6b7280" }}>{t("registerSubtitle", language)}</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            {/* Personal */}
            <Section icon={<User className="w-4 h-4" />} text={t("personalInfo", language)} />
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("fullName", language)} *</label>
                <div className="relative">
                  <input name="fullName" value={form.fullName} onChange={set} required placeholder={t("namePlaceholder", language)} className={inp} style={inpStyle} />
                  <button type="button" title={t("voiceInputSoon", language)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg" style={{ color: "#9ca3af" }}>
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("contactNumber", language)} *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input name="contactNumber" value={form.contactNumber} onChange={set} required placeholder={t("phonePlaceholder", language)} type="tel" className={inp} style={{ ...inpStyle, paddingLeft: "2.5rem" }} />
                </div>
              </div>
            </div>

            {/* Location */}
            <Section icon={<MapPin className="w-4 h-4" />} text={t("locationSection", language)} />
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("village", language)} *</label>
                <input name="village" value={form.village} onChange={set} required placeholder={t("villagePlaceholder", language)} className={inp} style={inpStyle} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("taluk", language)} *</label>
                  <input name="taluk" value={form.taluk} onChange={set} required placeholder={t("talukPlaceholder", language)} className={inp} style={inpStyle} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("district", language)} *</label>
                  <input name="district" value={form.district} onChange={set} required placeholder={t("districtPlaceholder", language)} className={inp} style={inpStyle} />
                </div>
              </div>
            </div>

            {/* Work */}
            <Section icon={<Briefcase className="w-4 h-4" />} text={t("workDetails", language)} />
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("skillType", language)} *</label>
                <select name="skillType" value={form.skillType} onChange={set} required className={inp} style={{ ...inpStyle, appearance: "none" }}>
                  <option value="">{t("selectSkill", language)}</option>
                  {SKILL_KEYS.map((k) => (
                    <option key={k} value={k}>{getSkillLabel(k, language)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("experience", language)} *</label>
                <input name="experience" value={form.experience} onChange={set} required placeholder={t("experiencePlaceholder", language)} type="number" min="0" max="50" className={inp} style={inpStyle} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("availability", language)}</label>
                <div className="flex gap-3">
                  {["Available", "Busy"].map((opt) => (
                    <button key={opt} type="button"
                      onClick={() => setForm({ ...form, availability: opt })}
                      className="flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-colors"
                      style={{
                        backgroundColor: form.availability === opt ? (opt === "Available" ? "#e8f5ee" : "#fef3ea") : "white",
                        borderColor:     form.availability === opt ? (opt === "Available" ? "#3d8b5e" : "#e8732a") : "#e5e7eb",
                        color:           form.availability === opt ? (opt === "Available" ? "#3d8b5e" : "#e8732a") : "#6b7280",
                      }}
                    >
                      {availLabel(opt)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hours */}
            <Section icon={<Clock className="w-4 h-4" />} text={t("workingHoursSection", language)} />
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>{t("workingHours", language)}</label>
              <input name="workingHours" value={form.workingHours} onChange={set} placeholder={t("workingHoursPlaceholder", language)} className={inp} style={inpStyle} />
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-md hover:shadow-lg hover:opacity-95 transition-all" style={{ backgroundColor: "#3d8b5e" }}>
                {t("register", language)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
