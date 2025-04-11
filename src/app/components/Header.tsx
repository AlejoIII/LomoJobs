"use client";

import React from "react";

interface HeaderProps {
  userType: "empresa" | "usuario" | null;
  onLogin: () => void;
  onRegister: () => void;
  onPostJob: () => void;
  showLogin: boolean;
  showRegister: boolean;
  showPostJob: boolean;
  onCloseLogin: () => void;
  onCloseRegister: () => void;
  onClosePostJob: () => void;
  registerType: "empresa" | "usuario" | null;
  setRegisterType: (type: "empresa" | "usuario" | null) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
  onViewPosts: () => void;
  onViewApplications: () => void;
}

export default function Header({
  userType,
  onLogin,
  onRegister,
  onPostJob,
  showLogin,
  showRegister,
  showPostJob,
  onCloseLogin,
  onCloseRegister,
  onClosePostJob,
  registerType,
  setRegisterType,
  isDarkMode,
  toggleTheme,
  onLogout,
  onViewPosts,
  onViewApplications,
}: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          LomoJobs
        </div>
        <div className="flex gap-4 items-center">
          {userType === "empresa" && (
            <>
              <button
                onClick={onPostJob}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition"
              >
                Publicar Trabajo
              </button>
              <button
                onClick={onViewPosts}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition"
              >
                Mis Publicaciones
              </button>
            </>
          )}

          {userType === "usuario" && (
            <button
              onClick={onViewApplications}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition"
            >
              Mis Postulaciones
            </button>
          )}

          {!userType && (
            <>
              <button
                onClick={onLogin}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={onRegister}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition"
              >
                Registrarse
              </button>
            </>
          )}

          {userType && (
            <button
              onClick={onLogout}
              className="bg-red-400 hover:bg-red-300 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Cerrar Sesión
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="py-2 px-4 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>
    </header>
  );
}
