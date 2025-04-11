"use client";

import { useEffect, useState } from "react";
import { getJobs } from "@/app/services/api";
import JobRow from "./JobRow";

interface Job {
  id: string;
  title: string;
  category: string;
  level: string;
  location: string;
  description?: string;
  company: {
    name: string;
  };
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedLevel, setSelectedLevel] = useState("Todos");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);

  useEffect(() => {
    getJobs()
      .then((data: Job[]) => {
        setJobs(data);
        setCategories(["Todos", ...new Set(data.map((j) => j.category))]);
        setLevels(["Todos", ...new Set(data.map((j) => j.level))]);
      })
      .catch(console.error);
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      (selectedCategory === "Todos" || job.category === selectedCategory) &&
      (selectedLevel === "Todos" || job.level === selectedLevel)
  );

  return (
    <div className="bg-purple-100 dark:bg-purple-900 py-6 mx-32 rounded-3xl transition-colors duration-300">
      <div className="container">
        <h2 className="font-bold mb-4 text-gray-800 dark:text-gray-100">Filtros:</h2>

        <div className="flex gap-4 mb-4">
          <select
            className="border p-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobRow key={job.id} job={job} onClick={() => setSelectedJob(job)} />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No hay ofertas disponibles.</p>
          )}
        </div>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{selectedJob.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedJob.company?.name}</p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{selectedJob.description || "Sin descripción."}</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {selectedJob.location} · {selectedJob.level}
            </p>
            <button
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
              onClick={() => setSelectedJob(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
