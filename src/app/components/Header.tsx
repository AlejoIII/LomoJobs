"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import FavoritesJobs from "./FavoritesJobs"; 
import { getProfile, updateProfile } from "@/app/services/api";
import { FaUserCircle } from "react-icons/fa";

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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const openProfileModal = async () => {
    try {
      const profile = await getProfile();
      setName(profile.name);
      setEmail(profile.email);
      setPreviewUrl(profile.image || null);
      setIsProfileModalOpen(true);
      setIsProfileMenuOpen(false);
    } catch (err) {
      console.error("Error al cargar el perfil", err);
    }
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (avatar instanceof File) {
        formData.append("image", avatar);
      }
      await updateProfile(formData);
      closeProfileModal();
    } catch (err) {
      alert("Error al actualizar el perfil");
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div
          className="text-2xl font-bold text-purple-600 dark:text-purple-400 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
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
              onClick={() => setIsFavoritesModalOpen(true)}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition"
            >
              Favoritos
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
            <div className="relative">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  onClick={toggleProfileMenu}
                />
              ) : (
                <FaUserCircle
                  className="w-10 h-10 text-gray-400 dark:text-gray-200 cursor-pointer"
                  onClick={toggleProfileMenu}
                />
              )}

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md overflow-hidden z-10">
                  <button
                    onClick={openProfileModal}
                    className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Ver/Editar Perfil
                  </button>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-600 dark:text-red-400"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="py-2 px-4 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {isProfileModalOpen && (
        <Modal onClose={closeProfileModal}>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Perfil</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatar(file);
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
            <img
              src={previewUrl || "/default-avatar.png"}
              alt="Vista previa"
              className="w-20 h-20 rounded-full object-cover border"
            />
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={closeProfileModal}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveProfile}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </Modal>
      )}

      {isFavoritesModalOpen && (
        <FavoritesJobs onClose={() => setIsFavoritesModalOpen(false)} />
      )}
    </header>
  );
}