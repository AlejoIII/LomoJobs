"use client";

import { useState } from "react";
import { registerUser, registerCompany } from "@/app/services/api";

interface RegisterFormProps {
  onRegister: (token: string) => void;
  type: "usuario" | "empresa";
}
export default function RegisterForm({ onRegister, type }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const user = await registerUser({
        name,
        email,
        password,
        role: type === "empresa" ? "EMPRESA" : "ESTUDIANTE",
      });
  
      if (type === "empresa") {
        await registerCompany({
          name,
          location: "Ubicación por definir",
          industry: "Industria por definir",
          user: {
            id: user.id,
          },
        });
      }
  
      onRegister(user.token || null); 
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar. Verifica tus datos.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        placeholder={type === "empresa" ? "Nombre de la empresa" : "Nombre completo"}
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        placeholder="Correo electrónico"
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
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition disabled:opacity-50"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}
