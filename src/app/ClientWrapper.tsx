"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import AuthGate from "./components/AuthGate";
import Footer from "./components/Footer";
import PostJobPopup from "./components/PostJobPopup";
import ListJobsPopup from "./components/ListJobsPopup";
import { postJob, updateJob, deleteJob } from "@/app/services/api";

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
    const lastPath = localStorage.getItem("lastPath");

    if (storedToken && storedType) {
      setToken(storedToken);
      setUserType(storedType);

      if (lastPath && lastPath !== "/login") {
        window.history.replaceState(null, "", lastPath);
      }
    } else {
      setUserType(null);
      setToken(null);
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

  useEffect(() => {
    const updateLastPath = () => {
      localStorage.setItem("lastPath", window.location.pathname);
    };

    window.addEventListener("popstate", updateLastPath);
    window.addEventListener("pushstate", updateLastPath);

    return () => {
      window.removeEventListener("popstate", updateLastPath);
      window.removeEventListener("pushstate", updateLastPath);
    };
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
    const companyId = localStorage.getItem("companyId");
  
    setToken(token);
    setUserType(type);
    localStorage.setItem("token", token);
    localStorage.setItem("userType", type);
    localStorage.setItem("lastPath", window.location.pathname); 
  
    if (type === "empresa" && !companyId) {
      fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(user => {
          if (user.company && user.company.id) {
            localStorage.setItem("companyId", user.company.id);
          }
        })
        .catch(err => console.error("No se pudo obtener companyId desde /users/me:", err));
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("lastPath");
    window.location.reload();
  };

  const handlePostJob = async (job: Partial<Job>) => {
    try {
      const companyId = localStorage.getItem("companyId");
      if (!companyId) throw new Error("El ID de la empresa no está disponible.");

      const created = await postJob(job, companyId);
      setJobs((prev) => [...prev, created]);
    } catch (err) {
      console.error("Error publicando trabajo:", err);
    }
  };

  const handleEditJob = async (updatedJob: Job) => {
    try {
      const response = await updateJob(updatedJob.id, updatedJob);
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === updatedJob.id ? response : job))
      );
      console.log("Oferta actualizada:", response);
    } catch (error) {
      console.error("Error al editar la oferta:", error);
      alert("No se pudo editar la oferta. Intenta nuevamente.");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      console.log("Oferta eliminada con éxito:", jobId);
    } catch (error) {
      console.error("Error al eliminar la oferta:", error);
      alert("No se pudo eliminar la oferta. Intenta nuevamente.");
    }
  };

  const handleViewPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Token:", token);      
      console.log(localStorage.getItem("companyId"))

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

        {showPostJob && (
          <PostJobPopup
            onClose={() => setShowPostJob(false)}
            onSubmit={handlePostJob}
            onPost={handlePostJob}
            loading={false} 
            successMessage="Job posted successfully!" 
          />
        )}
        {showListJobs && (
          <ListJobsPopup
            jobs={jobs}
            onClose={() => setShowListJobs(false)}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
          />
        )}

        {children}
        <Footer />
      </AuthGate>
    </div>
  );
}