"use client";

import { useState } from "react";

interface LoginFormProps {
  onLogin: (token: string) => void;
  type: "usuario" | "empresa";
}

export default function LoginForm({ onLogin, type }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();
      onLogin(data.token); 
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      alert("Error al iniciar sesión.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        placeholder={type === "usuario" ? "Correo del usuario" : "Correo de la empresa"}
        type="email"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        placeholder="Contraseña"
        type="password"
        required
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}
