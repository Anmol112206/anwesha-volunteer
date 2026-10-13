"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  MapPin
} from "lucide-react";

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/scanner";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your registered email address.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password, callbackUrl);
    } catch {
      // toast error handled inside auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col lg:flex-row bg-black text-white font-sans selection:bg-[#86A995] selection:text-black overflow-x-hidden relative">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#000000",
            color: "#FFFFFF",
            border: "1px solid #27272a",
            borderRadius: "14px",
            fontSize: "13px",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)",
          },
        }}
      />

      {/* MOBILE BACKGROUND PHOTOGRAPH (Visible on mobile/tablet) */}
      <div className="lg:hidden fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/iitp_central_library.jpg"
          alt="IIT Patna Central Library"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Pure black scrim overlay: dark and legible without hiding the library building */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
      </div>

      {/* LEFT COLUMN: Authentic IIT Patna Central Library Showcase (Desktop lg+) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative flex-col justify-between p-10 xl:p-14 overflow-hidden border-r border-neutral-900 z-10 bg-black">
        {/* Authentic Photograph as Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/iitp_central_library.jpg"
            alt="IIT Patna Central Library Complex"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
          />
          {/* Pure black gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black" />
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-start">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#86A995] uppercase bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-neutral-800">
            ANWESHA 2027
          </span>
        </div>

        {/* Middle Feature Copy */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Volunteer Portal &amp; <span className="text-[#86A995]">Gate Scanner</span>
          </h1>

          <p className="mt-4 text-sm xl:text-base text-neutral-300 leading-relaxed font-medium">
            Fast, secure, and touch-optimized access control for Anwesha 2027. Authenticate to initiate QR pass verification, venue roster inspection, and live security telemetry.
          </p>


        </div>

        {/* Footer Meta */}
        <div className="relative z-10 flex items-center text-xs text-neutral-400 pt-6 border-t border-neutral-800 font-mono">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-[#86A995]" />
            <span>Bihta, Patna 801106</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Mobile-First Login Form Container */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 lg:p-12 relative z-10 w-full min-h-[100dvh] lg:min-h-0 bg-transparent lg:bg-black">
        <div className="w-full max-w-[420px] mx-auto my-auto">
          
          {/* Main Glassmorphic Card */}
          <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.18)] relative overflow-hidden">
            {/* Form Header */}
            <div className="text-center mb-7">
              <div className="text-base sm:text-lg md:text-xl font-black tracking-[0.25em] text-[#86A995] uppercase mb-2">
                ANWESHA 2027
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Volunteer Portal
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 font-medium leading-relaxed">
                Sign in to access the gate scanner
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              
              {/* Email Address Field */}
              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  EMAIL ADDRESS
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 text-neutral-400 w-4 h-4 pointer-events-none shrink-0" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-12 pl-10 pr-4 bg-black/50 backdrop-blur-md border border-white/15 hover:border-white/25 text-white placeholder-neutral-400 text-sm rounded-xl focus:outline-none focus:border-[#86A995] focus:ring-2 focus:ring-[#86A995]/30 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  PASSWORD
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 text-neutral-400 w-4 h-4 pointer-events-none shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-10 pr-12 bg-black/40 backdrop-blur-md border border-white/15 hover:border-white/25 text-white placeholder-neutral-400 text-sm rounded-xl focus:outline-none focus:border-[#86A995] focus:ring-2 focus:ring-[#86A995]/25 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 w-11 h-11 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-lg focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 px-5 bg-[#86A995] hover:bg-[#759884] active:scale-[0.99] text-[#050f09] font-black text-sm rounded-xl shadow-lg shadow-[#86A995]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#050f09]" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Portal</span>
                      <ArrowRight size={16} className="stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Footer Notice */}
            <div className="mt-7 pt-4 border-t border-white/10 text-center">
              <p className="text-[11px] text-neutral-300 font-medium flex items-center justify-center gap-1.5">
                <ShieldCheck size={13} className="text-[#86A995] shrink-0" />
                <span>Authorized personnel only • IIT Patna Anwesha &apos;27</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-black">
          <Loader2 className="animate-spin text-[#86A995]" size={36} />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}