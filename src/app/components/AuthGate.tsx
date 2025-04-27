"use client";

import { useEffect, useState } from "react";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import { isTokenValid } from "./auth/Utils";

interface AuthGateProps {
  children: React.ReactNode;
  onAuth: (token: string, type: "usuario" | "empresa") => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function AuthGate({ children, onAuth, isDarkMode, toggleTheme }: AuthGateProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [userType, setUserType] = useState<"usuario" | "empresa" | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedType = localStorage.getItem("userType") as "usuario" | "empresa" | null;

    if (storedToken && storedType) {
      try {
        if (isTokenValid(storedToken)) {
          setAuthenticated(true);
          onAuth(storedToken, storedType);
        } else {
          setAuthenticated(false);
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
        }
      } catch (error) {
        console.error("Token inválido:", error);
        setAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
      }
    } else {
      setAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
    }
  }, [onAuth]);

  const handleAuth = (token: string | null) => {
    if (!userType) return;
  
    if (mode === "register") {
      setMode("login");
      alert("Registro exitoso. Ahora inicia sesión.");
    } else if (token) {
      setAuthenticated(true);
      onAuth(token, userType);
    }
  };
  
  const handleLogout = () => {
    setAuthenticated(false);
    setUserType(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
  };

  if (!authenticated) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className="py-2 px-4 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[90%] max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
          </h1>

          <div className="mb-4 flex justify-center gap-4">
            <button
              onClick={() => setUserType("usuario")}
              className={`py-2 px-4 rounded-md transition ${
                userType === "usuario"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              Usuario
            </button>
            <button
              onClick={() => setUserType("empresa")}
              className={`py-2 px-4 rounded-md transition ${
                userType === "empresa"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              Empresa
            </button>
          </div>

          {userType && (
            <div className="space-y-4">
              {mode === "login" ? (
                <LoginForm onLogin={handleAuth} type={userType} />
              ) : (
                <RegisterForm onRegister={handleAuth} type={userType} />
              )}
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {mode === "login" ? (
              <>
                ¿No tienes cuenta?{" "}
                <button onClick={() => setMode("register")} className="underline">
                  Regístrate
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <button onClick={() => setMode("login")} className="underline">
                  Inicia sesión
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
