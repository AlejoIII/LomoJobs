"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";

interface Job {
  id: string;
  title: string;
  category?: string;
  level: string;
  location: string;
  description?: string;
  company?: {
    name: string;
  };
}

interface FavoritesJobsProps {
  onClose: () => void;
}

export default function FavoritesJobs({ onClose }: FavoritesJobsProps) {
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const storedApplications = localStorage.getItem("applications");
    if (storedApplications) {
      try {
        const applications = JSON.parse(storedApplications) as Job[];
        const validApplications = applications.filter((job) => job.id);
        setFavoriteJobs(validApplications);
      } catch (error) {
        console.error("Error parsing applications from localStorage", error);
      }
    } else {
      setFavoriteJobs([]);
    }
  };

  const handleRemove = (id: string) => {
    const updatedJobs = favoriteJobs.filter((job) => job.id !== id);
    setFavoriteJobs(updatedJobs);
    localStorage.setItem("applications", JSON.stringify(updatedJobs));

    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      let favorites: string[] = JSON.parse(storedFavorites);
      favorites = favorites.filter((favId) => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Trabajos Favoritos
        </h2>

        {favoriteJobs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No tienes trabajos guardados como favoritos.
          </p>
        ) : (
          <div className="space-y-4">
            {favoriteJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md relative"
              >
                <button
                  onClick={() => handleRemove(job.id)}
                  className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700 transition"
                >
                  Quitar
                </button>

                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {job.category ? `${job.category} - ` : ""}
                  {job.level}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {job.location}
                </p>
                {job.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                    {job.description}
                  </p>
                )}
                {job.company?.name && (
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Empresa: {job.company.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}