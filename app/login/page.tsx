"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

// ── Icons ──────────────────────────────────────────────────────────────────
function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}
function IconLoader() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 animate-spin">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/scanner";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email."); return; }
    if (!password) { toast.error("Please enter your password."); return; }
    setLoading(true);
    try {
      await login(email, password, callbackUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050507]">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#15161f",
            color: "#f0f0f8",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
          },
        }}
      />

      {/* ── Ambient background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            top: "-10%",
            left: "-15%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            bottom: "-10%",
            right: "-10%",
            animation: "float 10s ease-in-out 2s infinite",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Card ── */}
      <div
        className="relative w-full max-w-md mx-4"
        style={{ animation: mounted ? "slideUp 0.5s ease-out" : "none" }}
      >
        {/* Top glow accent */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #10111a 0%, #0c0d14 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.1) inset",
          }}
        >
          {/* Inner glow at top */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }}
          />

          <div className="px-8 pt-10 pb-8">
            {/* ── Logo / Header ── */}
            <div className="flex flex-col items-center mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(79,70,229,0.15) 100%)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  boxShadow: "0 0 24px rgba(124,58,237,0.2)",
                }}
              >
                <span className="text-violet-400"><IconShield /></span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center mb-1">
                  <span
                    className="text-xs font-bold tracking-[0.3em] uppercase"
                    style={{ color: "rgba(124,58,237,0.8)" }}
                  >
                    ANWESHA 2027
                  </span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                  Volunteer Portal
                </h1>
                <p className="text-sm mt-2" style={{ color: "#6b6e8a" }}>
                  Sign in to access the gate scanner
                </p>
              </div>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold mb-2 tracking-wide" style={{ color: "#6b6e8a" }}>
                  EMAIL ADDRESS
                </label>
                <div className="relative group">
                  <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
                    style={{ color: "#4a4d68" }}
                  >
                    <IconMail />
                  </div>
                  <input
                    id="vol-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={loading}
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium text-white placeholder-[#3a3d58] outline-none transition-all duration-200 disabled:opacity-50"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid rgba(124,58,237,0.5)";
                      e.target.style.background = "rgba(124,58,237,0.06)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1px solid rgba(255,255,255,0.07)";
                      e.target.style.background = "rgba(255,255,255,0.04)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold mb-2 tracking-wide" style={{ color: "#6b6e8a" }}>
                  PASSWORD
                </label>
                <div className="relative group">
                  <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "#4a4d68" }}
                  >
                    <IconLock />
                  </div>
                  <input
                    id="vol-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    autoComplete="current-password"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium text-white placeholder-[#3a3d58] outline-none transition-all duration-200 disabled:opacity-50"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid rgba(124,58,237,0.5)";
                      e.target.style.background = "rgba(124,58,237,0.06)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1px solid rgba(255,255,255,0.07)";
                      e.target.style.background = "rgba(255,255,255,0.04)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                id="vol-login-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 mt-6"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  boxShadow: "0 0 24px rgba(124,58,237,0.35), 0 4px 15px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    (e.target as HTMLButtonElement).style.boxShadow =
                      "0 0 36px rgba(124,58,237,0.55), 0 4px 20px rgba(0,0,0,0.5)";
                    (e.target as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.boxShadow =
                    "0 0 24px rgba(124,58,237,0.35), 0 4px 15px rgba(0,0,0,0.4)";
                  (e.target as HTMLButtonElement).style.transform = "none";
                }}
              >
                {loading ? (
                  <>
                    <IconLoader />
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    Sign In to Portal
                  </>
                )}
              </button>
            </form>

            {/* ── Footer note ── */}
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-center text-xs" style={{ color: "#3a3d58" }}>
                Access restricted to authorized volunteers & admins only
              </p>
              <div className="flex items-center justify-center gap-4 mt-3">
                {["SECURE", "ENCRYPTED", "AUTHORIZED"].map((tag) => (
                  <span key={tag} className="text-[10px] font-bold tracking-widest" style={{ color: "#2a2d48" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom shimmer line */}
        <div className="absolute -bottom-px left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#050507]">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}