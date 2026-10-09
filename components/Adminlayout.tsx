"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { sidebarItems } from "../lib/navConfig";

// ── Icons ────────────────────────────────────────────────────────────────────
function IconMenu() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}
function IconX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}
function IconScan() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
    </svg>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 w-64
          flex flex-col
          md:relative md:translate-x-0 md:z-auto md:h-auto md:w-56 md:flex-shrink-0
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "linear-gradient(180deg, #0c0d14 0%, #09090f 100%)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Top section - Logo */}
        <div className="flex items-center justify-between px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-violet-400 shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(79,70,229,0.15) 100%)",
                border: "1px solid rgba(124,58,237,0.25)",
              }}
            >
              <IconScan />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-violet-500 uppercase">Anwesha</p>
              <p className="text-xs font-extrabold text-white leading-tight">Volunteer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          >
            <IconX />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => { if (window.innerWidth < 768) onClose(); }}
              >
                <div
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 cursor-pointer group"
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(79,70,229,0.12) 100%)",
                          border: "1px solid rgba(124,58,237,0.25)",
                          boxShadow: "0 0 16px rgba(124,58,237,0.12)",
                        }
                      : {
                          background: "transparent",
                          border: "1px solid transparent",
                        }
                  }
                >
                  <span
                    className="shrink-0 transition-colors duration-200"
                    style={{ color: isActive ? "#a78bfa" : "#4a4d68" }}
                  >
                    <Icon size={18} />
                  </span>
                  <span
                    className="text-sm font-semibold transition-colors duration-200"
                    style={{ color: isActive ? "#e2d9f3" : "#4a4d68" }}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <div
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: "#7c3aed", boxShadow: "0 0 6px #7c3aed" }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom user section */}
        <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          {/* User info */}
          {user && (
            <div
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-violet-300 font-bold text-sm"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
              >
                {user.name?.[0]?.toUpperCase() ?? <IconUser />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white/80 truncate">{user.name ?? "Volunteer"}</p>
                <p className="text-[10px] text-white/30 truncate">{user.role ?? "VOLUNTEER"}</p>
              </div>
            </div>
          )}
          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group"
            style={{ color: "#6b3a3a", border: "1px solid transparent" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(239,68,68,0.08)";
              el.style.border = "1px solid rgba(239,68,68,0.15)";
              el.style.color = "#f87171";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.border = "1px solid transparent";
              el.style.color = "#6b3a3a";
            }}
          >
            <IconLogout />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.includes("/scanner")) return "Gate Scanner";
    return "Dashboard";
  };

  return (
    <header
      className="shrink-0 flex items-center justify-between px-4 md:px-5 h-14"
      style={{
        background: "rgba(5,5,7,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center gap-3">
        <button
          id="sidebar-toggle-btn"
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <IconMenu />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-violet-400"
              style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5Z" />
              </svg>
            </div>
            <span className="text-white/20 text-sm">/</span>
          </div>
          <h1 className="text-sm font-bold text-white/80">{getTitle()}</h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Live indicator */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.2)",
            color: "#34d399",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </div>

        {/* Volunteer badge */}
        <div
          className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wider"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.2)",
            color: "#a78bfa",
          }}
        >
          VOLUNTEER
        </div>
      </div>
    </header>
  );
}

// ── Main Layout ───────────────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: "#050507", color: "#f0f0f8" }}
    >
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}