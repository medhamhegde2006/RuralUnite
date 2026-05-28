import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { WorkerRegistration } from "./components/WorkerRegistration";
import { FindWorkers } from "./components/FindWorkers";
import { WorkerProfile } from "./components/WorkerProfile";
import { WorkerDashboard } from "./components/WorkerDashboard";
import { AboutUs } from "./components/AboutUs";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Language, Page, Worker } from "./components/mockData";

/* MARKER-MAKE-KIT-INVOKED */
/* MARKER-MAKE-KIT-DISCOVERY-READ */

export default function App() {
  const [page, setPage]                     = useState<Page>("landing");
  const [language, setLanguage]             = useState<Language>("en");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const navigate = (target: string) => {
    setPage(target as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    navigate("worker-profile");
  };

  // ── Full-screen pages (no navbar) ───────────────────────────────────────
  if (page === "login") {
    return (
      <Login
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={navigate}
        onLoginSuccess={() => navigate("landing")}
      />
    );
  }

  if (page === "signup") {
    return (
      <SignUp
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={navigate}
        onSignUpSuccess={(role) => {
          // Workers → fill in their skill details next
          // Employers → go straight to find workers
          if (role === "worker") {
            navigate("register-worker");
          } else {
            navigate("find-workers");
          }
        }}
      />
    );
  }

  // ── Main app (with navbar) ──────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f5f0" }}>
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={navigate}
        currentPage={page}
      />

      {page === "landing" && (
        <LandingPage language={language} onNavigate={navigate} />
      )}

      {page === "register-worker" && (
        <WorkerRegistration language={language} onNavigate={navigate} />
      )}

      {page === "find-workers" && (
        <FindWorkers language={language} onSelectWorker={handleSelectWorker} />
      )}

      {page === "worker-profile" && selectedWorker && (
        <WorkerProfile
          language={language}
          worker={selectedWorker}
          onBack={() => navigate("find-workers")}
        />
      )}

      {page === "worker-dashboard" && (
        <WorkerDashboard language={language} onNavigate={navigate} />
      )}

      {page === "about" && (
        <AboutUs language={language} onNavigate={navigate} />
      )}
    </div>
  );
}
