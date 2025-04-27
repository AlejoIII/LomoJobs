"use client";

import { useState } from "react";

interface PostJobPopupProps {
  onClose: () => void;
  onPost: (jobData: any) => Promise<void>;
  loading: boolean;
  successMessage: string;
  onSubmit: (job: { title: string; category: string; level: string; location: string; companyId: string; date: string; description: string }) => Promise<void>;
}

export default function PostJobPopup({ onClose, onSubmit }: PostJobPopupProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Desarrollo");
  const [level, setLevel] = useState("Junior");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const companyId = localStorage.getItem("companyId");
    if (!companyId) {
      alert("No se encontró el ID de la empresa.");
      console.error("Error: El ID de la empresa no está disponible en localStorage.");
      return;
    }

    try {
      await onSubmit({ title, category, level, location, companyId, date, description });
      alert("Oferta publicada con éxito");

      setTitle("");
      setCategory("Desarrollo");
      setLevel("Junior");
      setLocation("");
      setDate("");
      setDescription("");

      onClose();
    } catch (err) {
      console.error("Error al intentar publicar la oferta:", err);
      alert("No se pudo publicar la oferta. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Publicar una nueva oferta</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título de la oferta..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          >
            <option value="Desarrollo">Desarrollo</option>
            <option value="Diseño">Diseño</option>
            <option value="Soporte Técnico">Soporte Técnico</option>
            <option value="Administración de Sistemas">Administración de Sistemas</option>
            <option value="Ciberseguridad">Ciberseguridad</option>
            <option value="Análisis de Datos">Análisis de Datos</option>
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          >
            <option value="Junior">Junior</option>
            <option value="Medio">Medio</option>
            <option value="Senior">Senior</option>
          </select>
          <input
            type="text"
            placeholder="Ubicación..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
          <input
            type="date"
            placeholder="Fecha de publicación..."
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
          <textarea
            placeholder="Descripción de la oferta..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
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
