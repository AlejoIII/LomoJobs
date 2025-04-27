"use client";

import { useEffect, useState } from "react";
import { getJobs, postJob } from "@/app/services/api";
import JobRow from "./JobRow";
import PostJobPopup from "./PostJobPopup";
import ContactPopup from "./ContactPopup"; 

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

interface JobsProps {
  searchQuery: string;
}

export default function Jobs({searchQuery }: JobsProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedLevel, setSelectedLevel] = useState("Todos");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showContactPopup, setShowContactPopup] = useState(false); 
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [showPostJobPopup, setShowPostJobPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  useEffect(() => {
    getJobs()
      .then((data: Job[]) => {
        setJobs(data);
        setCategories(["Todos", ...new Set(data.map((j) => j.category))]);
        setLevels(["Todos", ...new Set(data.map((j) => j.level))]);
      })
      .catch(console.error);

    setUserType(localStorage.getItem("userType"));
  }, []);

  const handlePostJob = async (jobData: any) => {
    setLoading(true);
    try {
      const companyId = localStorage.getItem("companyId");
      if (!companyId) throw new Error("Falta companyId");

      const newJob = await postJob(jobData, companyId);
      setJobs((prevJobs) => [...prevJobs, newJob]);

      setSuccessMessage("Oferta publicada exitosamente");
      setShowPostJobPopup(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Error al publicar la oferta");
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (job: Job) => {
    setSelectedJob(job);
    setShowContactPopup(true); 
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedJob) return;
  
    try {
      const studentName = localStorage.getItem("studentName");
      const studentEmail = localStorage.getItem("studentEmail");
  
      if (!studentName || !studentEmail) {
        alert("Por favor inicia sesión como estudiante para contactar.");
        return;
      }
  
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empresaEmail: selectedJob.company.name,
          nombre: studentName,
          email: studentEmail,
          mensaje: message,
        }),
      });
  
      if (response.ok) {
        alert("Mensaje enviado exitosamente");
        setShowContactPopup(false);
      } else {
        alert("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error(error);
      alert("Error al enviar el mensaje");
    }
  };
  
  const filteredJobs = jobs.filter(
    (job) =>
      (selectedCategory === "Todos" || job.category === selectedCategory) &&
      (selectedLevel === "Todos" || job.level === selectedLevel) &&
      (
        job.title.toLowerCase().includes(searchQuery) ||
        job.location.toLowerCase().includes(searchQuery) ||
        job.level.toLowerCase().includes(searchQuery) ||
        (job.company?.name.toLowerCase().includes(searchQuery) ?? false)
      )
  );  

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-purple-100 dark:bg-purple-900 py-6 mx-32 rounded-3xl transition-colors duration-300">
      <div className="container">
        <h2 className="font-bold mb-4 text-gray-800 dark:text-gray-100">Filtros:</h2>

        {userType === "EMPRESA" && (
          <div className="flex flex-col items-end mb-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition disabled:opacity-50"
              onClick={() => setShowPostJobPopup(true)}
              disabled={loading}
            >
              {loading ? "Publicando..." : "Publicar nueva oferta"}
            </button>
            {successMessage && (
              <span className="text-green-600 dark:text-green-400 mt-2 text-sm font-medium">
                {successMessage}
              </span>
            )}
          </div>
        )}

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
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                onClick={() => setSelectedJob(job)}
                onContact={() => handleContact(job)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No hay ofertas disponibles.
            </p>
          )}
        </div>

        {filteredJobs.length > jobsPerPage && (
          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="text-gray-600 dark:text-gray-300">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
              {selectedJob.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedJob.company?.name}
            </p>
            <p
              className="text-gray-500 dark:text-gray-400 mb-4 break-words"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {selectedJob.description || "Sin descripción."}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {selectedJob.location} · {selectedJob.level}
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
                onClick={() => handleContact(selectedJob)}
              >
                Contactar
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition"
                onClick={() => setSelectedJob(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showContactPopup && selectedJob && (
        <ContactPopup
          jobTitle={selectedJob.title}
          onClose={() => setShowContactPopup(false)}
          onSend={handleSendMessage}
        />
      )}

      {showPostJobPopup && (
        <PostJobPopup
          onClose={() => setShowPostJobPopup(false)}
          onSubmit={handlePostJob}
          onPost={handlePostJob}
          loading={loading}
          successMessage={successMessage}
        />
      )}
    </div>
  );
}