import { useState } from "react";
import {
  Eye, EyeOff, Phone, Lock, Sprout, ArrowLeft,
  User, Briefcase, UserCheck, Globe,
} from "lucide-react";
import { Language, t } from "./mockData";

type Role = "employer" | "worker";

type Props = {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (page: string) => void;
  onSignUpSuccess: (role: Role) => void;
};

const LANG_OPTIONS: { key: Language; label: string; full: string }[] = [
  { key: "en", label: "EN",     full: "English" },
  { key: "kn", label: "ಕನ್ನಡ", full: "ಕನ್ನಡ" },
  { key: "hi", label: "हिंदी",  full: "हिंदी" },
];

const GOOGLE_ICON = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export function SignUp({ language, onLanguageChange, onNavigate, onSignUpSuccess }: Props) {
  const [fullName, setFullName]       = useState("");
  const [credential, setCredential]   = useState("");
  const [password, setPassword]       = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole]               = useState<Role | "">("");
  const [loading, setLoading]         = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]             = useState("");

  // ── translated strings ──────────────────────────────────────────────────
  const str = {
    title:       { en: "Create Account",              kn: "ಖಾತೆ ತೆರೆಯಿರಿ",                hi: "अकाउंट बनाएं" }[language],
    subtitle:    { en: "Join RuralUnite today",       kn: "ಇಂದು ರೂರಲ್‌ಯುನೈಟ್ ಸೇರಿ",      hi: "आज RuralUnite से जुड़ें" }[language],
    confirmLbl:  { en: "Confirm Password",            kn: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",          hi: "पासवर्ड की पुष्टि करें" }[language],
    whoAreYou:   { en: "I am a…",                    kn: "ನಾನು…",                          hi: "मैं हूँ…" }[language],
    langPref:    { en: "Language Preference",         kn: "ಭಾಷಾ ಆದ್ಯತೆ",                  hi: "भाषा प्राथमिकता" }[language],
    createBtn:   { en: "Create Account",              kn: "ಖಾತೆ ರಚಿಸಿ",                    hi: "अकाउंट बनाएं" }[language],
    creating:    { en: "Creating account…",           kn: "ಖಾತೆ ರಚಿಸಲಾಗುತ್ತಿದೆ…",         hi: "अकाउंट बन रहा है…" }[language],
    haveAccount: { en: "Already have an account?",   kn: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",           hi: "पहले से खाता है?" }[language],
    loginLink:   { en: "Login",                      kn: "ಲಾಗಿನ್",                        hi: "लॉगिन" }[language],
    errRequired: { en: "Please fill in all required fields.", kn: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಮಾಹಿತಿ ತುಂಬಿ.", hi: "कृपया सभी जरूरी जानकारी भरें।" }[language],
    errMismatch: { en: "Passwords do not match.",    kn: "ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ.", hi: "पासवर्ड मेल नहीं खाते।" }[language],
    errRole:     { en: "Please select your role.",   kn: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪಾತ್ರ ಆಯ್ಕೆ ಮಾಡಿ.", hi: "कृपया अपनी भूमिका चुनें।" }[language],
    empLabel:    t("imEmployer", language),
    empSub:      { en: "Find & hire skilled workers", kn: "ಕೆಲಸಗಾರರನ್ನು ಹುಡುಕಿ ನೇಮಿಸಿ",    hi: "कुशल कामगार खोजें और काम पर रखें" }[language],
    wrkLabel:    t("imWorker", language),
    wrkSub:      { en: "Showcase skills, get hired",  kn: "ಕೌಶಲ್ಯ ತೋರಿಸಿ, ಕೆಲಸ ಪಡೆಯಿರಿ",   hi: "कौशल दिखाएं, काम पाएं" }[language],
  };

  // ── submit ──────────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !credential || !password || !confirmPass) { setError(str.errRequired); return; }
    if (password !== confirmPass) { setError(str.errMismatch); return; }
    if (!role) { setError(str.errRole); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onSignUpSuccess(role as Role); }, 1400);
  };

  const handleGoogle = () => {
    if (!role) { setError(str.errRole); return; }
    setError("");
    setGoogleLoading(true);
    setTimeout(() => { setGoogleLoading(false); onSignUpSuccess(role as Role); }, 1400);
  };

  // ── field helper ────────────────────────────────────────────────────────
  const inp = "w-full py-3.5 rounded-xl border text-sm outline-none transition-colors bg-white";
  const inpSt = { borderColor: "#e5e7eb", color: "#1a2e1f" };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f7f5f0" }}>

      {/* Top bar */}
      <div className="px-4 pt-5 flex items-center justify-between">
        <button
          onClick={() => onNavigate("login")}
          className="flex items-center gap-2 text-sm"
          style={{ color: "#3d8b5e" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("loginBtn", language)}
        </button>

        {/* Language switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white shadow-sm">
          {LANG_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onLanguageChange(key)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: language === key ? "#3d8b5e" : "transparent",
                color: language === key ? "white" : "#6b7280",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="text-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: "#3d8b5e" }}
            >
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl font-bold mb-0.5" style={{ color: "#1a2e1f" }}>{str.title}</h1>
            <p className="text-sm" style={{ color: "#6b7280" }}>{str.subtitle}</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>
                  {t("fullName", language)} *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type="text" value={fullName}
                    onChange={(e) => { setFullName(e.target.value); setError(""); }}
                    placeholder={t("namePlaceholder", language)}
                    className={inp} style={{ ...inpSt, paddingLeft: "2.5rem" }}
                  />
                </div>
              </div>

              {/* Email / Phone */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>
                  {t("emailOrPhone", language)} *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type="text" value={credential}
                    onChange={(e) => { setCredential(e.target.value); setError(""); }}
                    placeholder={language === "kn" ? "ಇಮೇಲ್ ಅಥವಾ +91 ..." : language === "hi" ? "ईमेल या +91 ..." : "Email or +91 ..."}
                    className={inp} style={{ ...inpSt, paddingLeft: "2.5rem" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>
                  {t("password", language)} *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type={showPass ? "text" : "password"} value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className={inp} style={{ ...inpSt, paddingLeft: "2.5rem", paddingRight: "2.75rem" }}
                  />
                  <button
                    type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>
                  {str.confirmLbl} *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type={showConfirm ? "text" : "password"} value={confirmPass}
                    onChange={(e) => { setConfirmPass(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className={inp} style={{ ...inpSt, paddingLeft: "2.5rem", paddingRight: "2.75rem" }}
                  />
                  <button
                    type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role selection */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "#374151" }}>
                  {str.whoAreYou} *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "employer" as Role, icon: <Briefcase className="w-6 h-6" />, label: str.empLabel, sub: str.empSub, activeColor: "#e8732a", activeBg: "#fef3ea" },
                    { key: "worker"   as Role, icon: <UserCheck  className="w-6 h-6" />, label: str.wrkLabel, sub: str.wrkSub,  activeColor: "#3d8b5e", activeBg: "#e8f5ee" },
                  ].map(({ key, icon, label, sub, activeColor, activeBg }) => (
                    <button
                      key={key} type="button"
                      onClick={() => { setRole(key); setError(""); }}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center"
                      style={{
                        borderColor:     role === key ? activeColor : "#e5e7eb",
                        backgroundColor: role === key ? activeBg   : "white",
                        color:           role === key ? activeColor : "#6b7280",
                      }}
                    >
                      <span>{icon}</span>
                      <span className="text-xs font-semibold leading-tight">{label}</span>
                      <span className="leading-tight" style={{ fontSize: "0.65rem", color: role === key ? activeColor : "#9ca3af" }}>{sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language preference */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "#374151" }}>
                  <Globe className="w-3.5 h-3.5 inline mr-1" style={{ color: "#3d8b5e" }} />
                  {str.langPref}
                </label>
                <div className="flex gap-2">
                  {LANG_OPTIONS.map(({ key, label }) => (
                    <button
                      key={key} type="button"
                      onClick={() => onLanguageChange(key)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all"
                      style={{
                        borderColor:     language === key ? "#3d8b5e" : "#e5e7eb",
                        backgroundColor: language === key ? "#e8f5ee" : "white",
                        color:           language === key ? "#3d8b5e" : "#6b7280",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-sm transition-opacity"
                style={{ backgroundColor: "#3d8b5e", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {str.creating}
                  </span>
                ) : str.createBtn}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
              <span className="text-xs" style={{ color: "#9ca3af" }}>{t("orContinueWith", language)}</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
            </div>

            {/* Google signup */}
            <button
              onClick={handleGoogle} disabled={googleLoading}
              className="w-full py-3.5 rounded-2xl border flex items-center justify-center gap-3 text-sm font-medium hover:bg-gray-50 transition-colors"
              style={{ borderColor: "#e5e7eb", color: "#374151", opacity: googleLoading ? 0.7 : 1 }}
            >
              {googleLoading
                ? <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                : GOOGLE_ICON}
              {t("googleLogin", language)}
            </button>

            {/* Login link */}
            <p className="text-center text-sm mt-5" style={{ color: "#6b7280" }}>
              {str.haveAccount}{" "}
              <button
                onClick={() => onNavigate("login")}
                className="font-semibold"
                style={{ color: "#3d8b5e" }}
              >
                {str.loginLink}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
