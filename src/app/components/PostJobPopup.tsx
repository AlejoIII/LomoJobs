// components/PostJobPopup.tsx
"use client";

import { useState } from "react";

interface PostJobPopupProps {
  onClose: () => void;
  onSubmit: (job: any) => void;
}

export default function PostJobPopup({ onClose, onSubmit }: PostJobPopupProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, category, level, location });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Publicar una nueva oferta</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título del trabajo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
          <input
            type="text"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
          <input
            type="text"
            placeholder="Nivel"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 rounded text-white">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white">
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}