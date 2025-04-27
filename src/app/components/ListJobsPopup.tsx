"use client";

import { useState } from "react";

interface Job {
  id: string;
  title: string;
  category: string;
  level: string;
  location: string;
  description?: string;
}

interface ListJobsPopupProps {
  jobs: Job[];
  onClose: () => void;
  onEdit: (job: Job) => Promise<void>; 
  onDelete: (jobId: string) => Promise<void>; 
}

export default function ListJobsPopup({ jobs, onClose, onEdit, onDelete }: ListJobsPopupProps) {
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editedJob, setEditedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false); 

  const handleEditClick = (job: Job) => {
    setEditingJobId(job.id);
    setEditedJob(job);
  };

  const handleSaveClick = async () => {
    if (editedJob) {
      setLoading(true);
      try {
        await onEdit(editedJob); 
        setEditingJobId(null);
        setEditedJob(null);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
        alert("No se pudo guardar los cambios. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteClick = async (jobId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta oferta?")) {
      setLoading(true);
      try {
        await onDelete(jobId); 
      } catch (error) {
        console.error("Error al eliminar la oferta:", error);
        alert("No se pudo eliminar la oferta. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Mis ofertas publicadas</h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold text-lg"
            disabled={loading}
          >
            ✖
          </button>
        </div>
        {jobs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No tienes ofertas publicadas.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md"
              >
                {editingJobId === job.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedJob?.title || ""}
                      onChange={(e) =>
                        setEditedJob((prev) => prev && { ...prev, title: e.target.value })
                      }
                      className="w-full p-2 rounded bg-white dark:bg-gray-600 text-black dark:text-white"
                      placeholder="Título del trabajo"
                      disabled={loading}
                    />
                    <input
                      type="text"
                      value={editedJob?.category || ""}
                      onChange={(e) =>
                        setEditedJob((prev) => prev && { ...prev, category: e.target.value })
                      }
                      className="w-full p-2 rounded bg-white dark:bg-gray-600 text-black dark:text-white"
                      placeholder="Categoría"
                      disabled={loading}
                    />
                    <input
                      type="text"
                      value={editedJob?.level || ""}
                      onChange={(e) =>
                        setEditedJob((prev) => prev && { ...prev, level: e.target.value })
                      }
                      className="w-full p-2 rounded bg-white dark:bg-gray-600 text-black dark:text-white"
                      placeholder="Nivel"
                      disabled={loading}
                    />
                    <input
                      type="text"
                      value={editedJob?.description || ""}
                      onChange={(e) =>
                        setEditedJob((prev) => prev && { ...prev, description: e.target.value })
                      }
                      className="w-full p-2 rounded bg-white dark:bg-gray-600 text-black dark:text-white"
                      placeholder="Descripción"
                      disabled={loading}
                    />
                    <input
                      type="text"
                      value={editedJob?.location || ""}
                      onChange={(e) =>
                        setEditedJob((prev) => prev && { ...prev, location: e.target.value })
                      }
                      className="w-full p-2 rounded bg-white dark:bg-gray-600 text-black dark:text-white"
                      placeholder="Ubicación"
                      disabled={loading}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingJobId(null);
                          setEditedJob(null);
                        }}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                        disabled={loading}
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveClick}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
                        disabled={loading}
                      >
                        {loading ? "Guardando..." : "Guardar"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {job.category} - {job.level}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
                    <div className="flex justify-end mt-2 gap-2">
                      <button
                        onClick={() => handleEditClick(job)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
                        disabled={loading}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteClick(job.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                        disabled={loading}
                      >
                        {loading ? "Eliminando..." : "Eliminar"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}