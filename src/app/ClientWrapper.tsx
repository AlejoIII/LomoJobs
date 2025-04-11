"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import AuthGate from "./components/AuthGate";
import Footer from "./components/Footer";
import PostJobPopup from "./components/PostJobPopup";
import ListJobsPopup from "./components/ListJobsPopup";

interface Job {
  id: string;
  title: string;
  category: string;
  level: string;
  location: string;
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<"empresa" | "usuario" | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPostJob, setShowPostJob] = useState(false);
  const [showListJobs, setShowListJobs] = useState(false);
  const [registerType, setRegisterType] = useState<"empresa" | "usuario" | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedType = localStorage.getItem("userType") as "empresa" | "usuario" | null;
    if (storedToken && storedType) {
      setToken(storedToken);
      setUserType(storedType);
    }

    const theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const handleAuth = (token: string, type: "usuario" | "empresa") => {
    setToken(token);
    setUserType(type);
    localStorage.setItem("token", token);
    localStorage.setItem("userType", type);
  };

  const handleLogout = () => {
    setUserType(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    window.location.reload();
  };

  const handlePostJob = async (job: Partial<Job>) => {
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      if (!res.ok) throw new Error("No se pudo publicar la oferta");

      const created = await res.json();
      setJobs((prev) => [...prev, created]);
    } catch (err) {
      console.error("Error publicando trabajo:", err);
    }
  };

  const handleViewPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener trabajos");
      const data = await res.json();
      setJobs(data);
      setShowListJobs(true);
    } catch (err) {
      console.error("Error al obtener publicaciones:", err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 min-h-screen">
      <AuthGate isDarkMode={isDarkMode} toggleTheme={toggleTheme} onAuth={handleAuth}>
        <Header
          userType={userType}
          onLogin={() => setShowLogin(true)}
          onRegister={() => setShowRegister(true)}
          onPostJob={() => setShowPostJob(true)}
          showLogin={showLogin}
          showRegister={showRegister}
          showPostJob={showPostJob}
          onCloseLogin={() => setShowLogin(false)}
          onCloseRegister={() => {
            setShowRegister(false);
            setRegisterType(null);
          }}
          onClosePostJob={() => setShowPostJob(false)}
          registerType={registerType}
          setRegisterType={setRegisterType}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
          onViewPosts={handleViewPosts}
          onViewApplications={() => alert("Aquí se mostrarían tus postulaciones")}
        />

        {showPostJob && <PostJobPopup onClose={() => setShowPostJob(false)} onSubmit={handlePostJob} />}
        {showListJobs && <ListJobsPopup jobs={jobs} onClose={() => setShowListJobs(false)} />}

        {children}
        <Footer />
      </AuthGate>
    </div>
  );
}
