"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "./Modal";

export default function Header() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showPostJob, setShowPostJob] = useState<boolean>(false);
  const [registerType, setRegisterType] = useState<"empresa" | "usuario" | null>(null);
  const [userType, setUserType] = useState<"empresa" | "usuario" | null>(null);

  return (
    <>
      <header className="relative z-10">
        <div className="container flex items-center justify-between mx-auto my-4">
          <Link href="/" className="font-bold xl">LomoJobs</Link>
          <nav className="flex gap-4">
            {!userType && (
              <>
                <button onClick={() => setShowRegister(true)} className="bg-purple-400 px-4 py-2 rounded-md text-white">Registrarse</button>
                <button onClick={() => setShowLogin(true)} className="bg-purple-400 px-4 py-2 rounded-md  text-white">Iniciar Sesión</button>
              </>
            )}
            {userType === "empresa" && (
              <button onClick={() => setShowPostJob(true)} className="bg-purple-400 text-white px-4 py-2 rounded-md">Añadir Oferta</button>
            )}
          </nav>
        </div>
      </header>

      {/* Modal de Login */}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
          <input type="email" placeholder="Correo" className="border p-2 w-full mb-2" />
          <input type="password" placeholder="Contraseña" className="border p-2 w-full mb-4" />
          <button 
            className="bg-purple-400 text-white px-4 py-2 w-full rounded-md" 
            onClick={() => { setUserType("empresa"); setShowLogin(false); }}
          >
            Ingresar
          </button>
        </Modal>
      )}

      {/* Modal de Registro */}
      {showRegister && (
        <Modal onClose={() => { setShowRegister(false); setRegisterType(null); }}>
          {!registerType ? (
            <>
              <h2 className="text-xl font-bold mb-4">¿Eres una empresa o un usuario?</h2>
              <button onClick={() => setRegisterType("empresa")} className="bg-purple-200 px-4 py-2 w-full rounded-md mb-2">Empresa</button>
              <button onClick={() => setRegisterType("usuario")} className="bg-purple-200 px-4 py-2 w-full rounded-md">Usuario</button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Registrarse como {registerType}</h2>
              <input type="text" placeholder="Nombre..." className="border p-2 w-full mb-2" />
              <input type="email" placeholder="Correo..." className="border p-2 w-full mb-2" />
              <input type="password" placeholder="Contraseña..." className="border p-2 w-full mb-4" />
              <button 
                className="bg-purple-400 text-white px-4 py-2 w-full rounded-md" 
                onClick={() => { setUserType(registerType); setShowRegister(false); }}
              >
                Registrarse
              </button>
            </>
          )}
        </Modal>
      )}

      {/* Modal de Añadir Oferta */}
      {showPostJob && userType === "empresa" && (
        <Modal onClose={() => setShowPostJob(false)}>
          <h2 className="text-xl font-bold mb-4">Añadir Oferta</h2>
          <input type="text" placeholder="Título del puesto" className="border p-2 w-full mb-2" />
          <input type="text" placeholder="Empresa" className="border p-2 w-full mb-2" />
          <input type="text" placeholder="Ubicación" className="border p-2 w-full mb-2" />
          <textarea placeholder="Descripción" className="border p-2 w-full mb-2" rows={4}></textarea>
          <button className="bg-purple-400 text-white px-4 py-2 w-full rounded-md">Publicar</button>
        </Modal>
      )}
    </>
  );
}