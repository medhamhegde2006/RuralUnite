import { useState } from "react";
import { Eye, EyeOff, Phone, Lock, Sprout, ArrowLeft } from "lucide-react";
import { Language, t } from "./mockData";

type Props = {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (page: string) => void;
  onLoginSuccess: () => void;
};

const LANG_OPTIONS: { key: Language; label: string }[] = [
  { key: "en", label: "EN" },
  { key: "kn", label: "ಕನ್ನಡ" },
  { key: "hi", label: "हिंदी" },
];

const GOOGLE_ICON = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export function Login({ language, onLanguageChange, onNavigate, onLoginSuccess }: Props) {
  const [credential, setCredential] = useState("");
  const [password, setPassword]     = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]           = useState("");

  const requiredMsg = {
    en: "Please enter your email/phone and password.",
    kn: "ದಯವಿಟ್ಟು ಇಮೇಲ್/ಫೋನ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.",
    hi: "कृपया ईमेल/फ़ोन और पासवर्ड दर्ज करें।",
  }[language];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credential || !password) { setError(requiredMsg); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onLoginSuccess(); }, 1200);
  };

  const handleGoogle = () => {
    setGoogleLoading(true);
    setTimeout(() => { setGoogleLoading(false); onLoginSuccess(); }, 1200);
  };

  const inp = "w-full py-3.5 rounded-xl border text-sm outline-none transition-colors bg-white";
  const inpSt = { borderColor: "#e5e7eb", color: "#1a2e1f" };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f7f5f0" }}>

      {/* Top bar */}
      <div className="px-4 pt-5 flex items-center justify-between">
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-2 text-sm"
          style={{ color: "#3d8b5e" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToHome", language)}
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

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: "#3d8b5e" }}
            >
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl font-bold mb-1" style={{ color: "#1a2e1f" }}>
              {t("welcomeBack", language)}
            </h1>
            <p className="text-sm" style={{ color: "#6b7280" }}>
              {t("enterCredentials", language)}
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email / Phone */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#374151" }}>
                  {t("emailOrPhone", language)}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type="text" value={credential}
                    onChange={(e) => { setCredential(e.target.value); setError(""); }}
                    placeholder={language === "kn" ? "ಇಮೇಲ್ ಅಥವಾ +91 ..." : language === "hi" ? "ईमेल या +91 ..." : "Email or +91 ..."}
                    className={inp}
                    style={{ ...inpSt, paddingLeft: "2.5rem" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium" style={{ color: "#374151" }}>
                    {t("password", language)}
                  </label>
                  <button type="button" className="text-xs" style={{ color: "#3d8b5e" }}>
                    {t("forgotPassword", language)}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type={showPass ? "text" : "password"} value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className={inp}
                    style={{ ...inpSt, paddingLeft: "2.5rem", paddingRight: "2.75rem" }}
                  />
                  <button
                    type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "#9ca3af" }}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit" disabled={loading}
                className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-sm transition-opacity"
                style={{ backgroundColor: "#3d8b5e", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {language === "kn" ? "ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ…" : language === "hi" ? "लॉगिन हो रहा है…" : "Logging in…"}
                  </span>
                ) : t("loginBtn", language)}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
              <span className="text-xs" style={{ color: "#9ca3af" }}>{t("orContinueWith", language)}</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
            </div>

            {/* Google login */}
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

            {/* Sign up link */}
            <p className="text-center text-sm mt-6" style={{ color: "#6b7280" }}>
              {t("noAccount", language)}{" "}
              <button
                onClick={() => onNavigate("signup")}
                className="font-semibold"
                style={{ color: "#e8732a" }}
              >
                {language === "kn" ? "ಸೈನ್ ಅಪ್ ಮಾಡಿ" : language === "hi" ? "साइन अप करें" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
